// * CONSTANTS
// Status Flags - these are used to determine whether an element can move or be moved
const STATUS = {
  open: "open", // initialized
  set: "set", // set position by neighboring elements
  locked: "locked" // position locked by logic (i.e. boundary of window, num units)
};

// * LABELSPACER
// LabelSpacer takes a set of key-value pairs and spaces
// them out given a set height and padding. Use the class
// to vertically space overlapping d3 labels.
class LabelSpacer {
  // take a set of key-value pairs and sort them into a new map
  constructor(yPositions, conflictHeight = 10, conflictPadding = 1) {
    this.labelMap = new Map();
    this.conflictSize = this.conflictHeightPx(conflictHeight, conflictPadding);

    // fill the label map using the input
    Object.keys(yPositions)
      .sort((a, b) => yPositions[a] - yPositions[b])
      .map((key, idx) => {
        this.labelMap.set(idx, {
          name: key,
          value: yPositions[key],
          status: STATUS.open
        });
      });

    // process the main logical operations
    this.orderOfOperations();
  }

  // the main handler of the ooo
  orderOfOperations() {
    // flag the conflicts
    this.flagConflicts(this.labelMap, this.conflictSize);
    // count and flag the cluster conflicts
    const numClusters = this.countAndFlagClusters(this.labelMap);

    if (numClusters === 1) {
      this.handleSingleCluster(this.labelMap, this.conflictSize);
    }
  }

  // * FUNCTIONS

  // add new attribute to elements of the map indicating
  // where there's a conflict with neighbors given font height
  // and padding between each element
  flagConflicts(inputMap, conflictSize) {
    // assume the conflict will be half above and half below
    const conflictPixelRange = conflictSize / 2;

    inputMap.forEach((value, key, map) => {
      let conflict = false;

      if (key !== 0) {
        // check whether there's a conflict with the previous item
        const previousItem = map.get(key - 1);
        if (
          value.hasOwnProperty("value") &&
          previousItem.hasOwnProperty("value")
        ) {
          if (
            value.value - conflictPixelRange <
            previousItem.value + conflictPixelRange
          ) {
            conflict = true;
          }
        }
      }

      if (key !== map.size - 1) {
        // check whether there's a conflict with the next item
        const nextItem = map.get(key + 1);
        if (value.hasOwnProperty("value") && nextItem.hasOwnProperty("value")) {
          if (
            value.value + conflictPixelRange >
            nextItem.value - conflictPixelRange
          ) {
            conflict = true;
          }
        }
      }
      map.set(key, { ...value, conflict: conflict });
    });
  }

  // return the height plus padding x2
  conflictHeightPx(height, padding) {
    return height + padding * 2;
  }

  // detect clusters of conflicting elements and enumerate them
  countAndFlagClusters(inputMap) {
    let clusterEnumerator = 0;
    inputMap.forEach((value, key, map) => {
      // check whether there's a conflict with the next item
      let nextConflict = false;
      if (key !== map.size - 1) {
        const nextItem = map.get(key + 1);
        if (nextItem.hasOwnProperty("conflict") && nextItem.conflict) {
          nextConflict = true;
        }
      }

      // check whether there's a conflict with the previous item
      let previousConflict = false;
      if (key !== 0) {
        const previousItem = map.get(key - 1);
        if (previousItem.hasOwnProperty("conflict") && previousItem.conflict) {
          previousConflict = true;
        }
      }

      // check whether there's a conflict with the current item
      let currentConflict = false;
      if (value.hasOwnProperty("conflict") && value.conflict) {
        currentConflict = true;
      }

      // update the cluster id/count
      if (currentConflict && !previousConflict) {
        clusterEnumerator += 1;
      }

      // flag the cluster in the map object
      if (currentConflict && (nextConflict || previousConflict)) {
        map.set(key, { ...value, cluster: clusterEnumerator });
      }
    });
    return clusterEnumerator;
  }

  // print the current map
  print() {
    console.log(this.labelMap);
  }

  export() {
    const returnObject = {};
    this.labelMap.forEach(value => {
      returnObject[value.name] = value.value;
    });
    return returnObject;
  }

  // handle the case where there's only a single cluster
  handleSingleCluster(inputMap, conflictSize) {
    // create a map for this single cluster
    let thisCluster = new Map(
      [...inputMap].filter(([_, v]) => {
        return v.hasOwnProperty("cluster") && v.cluster === 1;
      })
    );

    this.spaceValuesByMedian(thisCluster, conflictSize); // space the values of the cluster around the median
    this.patchMap(inputMap, thisCluster); // patch the full map with the updated values
    this.trimMapProps(inputMap);
    this.spaceConflictsFromSetValues(inputMap, conflictSize); // use the set values to space out open values
    this.trimMapProps(inputMap);
  }

  // space the conflicting values around the median
  spaceValuesByMedian(thisCluster, conflictSize) {
    // get the cluster rank median to know where to start spacing
    const medianRankOfCluster = this.calculateMedian(
      [...thisCluster].map(o => o[0])
    );

    // get the center point of the cluster
    let centerPointOfCluster;
    if (thisCluster.get(medianRankOfCluster)) {
      centerPointOfCluster = thisCluster.get(medianRankOfCluster).value;
    } else {
      centerPointOfCluster =
        (thisCluster.get(Math.ceil(medianRankOfCluster)).value +
          thisCluster.get(Math.floor(medianRankOfCluster)).value) /
        2;
    }

    thisCluster.forEach((value, key) => {
      let newValue;
      if (key === medianRankOfCluster) {
        // if this is the median, leave it but update the status
        newValue = value.value;
      } else if (key > medianRankOfCluster) {
        // above median, linearly space above by distance from median * conflict height
        newValue =
          centerPointOfCluster +
          Math.abs(key - medianRankOfCluster) * conflictSize;
      } else if (key < medianRankOfCluster) {
        // below median, linearly space below by distance from median * conflict height
        newValue =
          centerPointOfCluster -
          Math.abs(key - medianRankOfCluster) * conflictSize;
      }
      thisCluster.set(key, { ...value, value: newValue, status: STATUS.set });
    });
  }

  // calculate the median of an array
  calculateMedian(arr) {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }

  // update an existing map using a new map
  patchMap(oldMap, newMap) {
    newMap.forEach((value, key) => {
      oldMap.set(key, value);
    });
  }

  // remove all the props on a map object except for the name and value
  trimMapProps(inputMap) {
    inputMap.forEach((value, key) => {
      inputMap.set(key, {
        name: value.name,
        value: value.value,
        status: value.status
      });
    });
  }

  // use the existing set values to space out any open conflicts
  spaceConflictsFromSetValues(inputMap, conflictSize) {
    let ctr = 0; // just in case of long-running loops

    while (this.flagAndCheckForOpenConflicts(inputMap)) {
      // move every open conflict away from the set val by the margin
      inputMap.forEach((value, key, map) => {
        if (
          value &&
          value.hasOwnProperty("status") &&
          value.status === STATUS.open &&
          value.hasOwnProperty("conflict") &&
          value.conflict
        ) {
          // get the neighbor values
          const previousItem = key !== 0 ? map.get(key - 1) : undefined;
          const nextItem = key !== map.size - 1 ? map.get(key + 1) : undefined;

          // find any set neighbor and update
          if (
            previousItem &&
            previousItem.hasOwnProperty("status") &&
            previousItem.status === STATUS.set
          ) {
            if (previousItem.hasOwnProperty("value")) {
              // move the element down into space and update the status
              map.set(key, {
                ...value,
                value: previousItem.value + conflictSize,
                status: STATUS.set
              });
            }
          } else if (
            nextItem &&
            nextItem.hasOwnProperty("status") &&
            nextItem.status === STATUS.set
          ) {
            if (nextItem.hasOwnProperty("value")) {
              // move the element up into space and update the status
              map.set(key, {
                ...value,
                value: nextItem.value - conflictSize,
                status: STATUS.set
              });
            }
          }
        }
      });
      ctr += 1;
      if (ctr > 100) {
        console.log("Exited early - possible inf loop");
        return;
      }
    }
  }

  // find whether an open conflict exists
  // this indicates it's available to be moved and is in
  // conflicting space with a neighboring element
  flagAndCheckForOpenConflicts(inputMap) {
    this.flagConflicts(inputMap);
    return [...inputMap].find(([k, v]) => {
      return (
        v.hasOwnProperty("status") &&
        v.status === STATUS.open &&
        v.hasOwnProperty("conflict") &&
        v.conflict === true
      );
    });
  }
}

// // ! TEMP FOR TESTING
// const allStates = {
//   Alabama: 195,
//   Alaska: 162,
//   Arizona: 201,
//   Arkansas: 221,
//   California: 193,
//   Colorado: 184,
//   Connecticut: 187,
//   Delaware: 170,
//   "District of Columbia": 110,
//   Florida: 214,
//   Georgia: 193,
//   Hawaii: 192,
//   Idaho: 207,
//   Illinois: 205,
//   Indiana: 196,
//   Iowa: 188,
//   Kansas: 200,
//   Kentucky: 185,
//   Louisiana: 195,
//   Maine: 211,
//   Maryland: 128,
//   Massachusetts: 181,
//   Michigan: 201,
//   Minnesota: 190,
//   Mississippi: 201,
//   Missouri: 204,
//   Montana: 215,
//   Nebraska: 200,
//   Nevada: 206,
//   "New Hampshire": 187,
//   "New Jersey": 205,
//   "New Mexico": 190,
//   "New York": 201,
//   "North Carolina": 191,
//   "North Dakota": 118,
//   Ohio: 199,
//   Oklahoma: 196,
//   Oregon: 198,
//   Pennsylvania: 187,
//   "Rhode Island": 204,
//   "South Carolina": 193,
//   "South Dakota": 199,
//   Tennessee: 200,
//   Texas: 183,
//   Utah: 196,
//   Vermont: 196,
//   Virginia: 136,
//   Washington: 189,
//   "West Virginia": 205,
//   Wisconsin: 197,
//   Wyoming: 135
// };
// const sixStates = {
//   Alabama: 132,
//   Alaska: 85,
//   Arizona: 139,
//   Arkansas: 169,
//   California: 128,
//   Colorado: 116,
//   Connecticut: 121
// };
// const whatsupwiththis = {
//   Alabama: 195,
//   Alaska: 162,
//   Arizona: 201,
//   Arkansas: 221,
//   California: 193,
//   Colorado: 184,
//   Connecticut: 187,
//   Delaware: 170,
//   Florida: 214,
//   Georgia: 193,
//   Hawaii: 192,
//   Idaho: 207,
//   Illinois: 205,
//   Indiana: 196,
//   Iowa: 188,
//   Kansas: 200,
//   Kentucky: 185,
//   Louisiana: 195,
//   Maine: 211,
//   Maryland: 128,
//   Massachusetts: 181,
//   Michigan: 201
// };
// const sixStatesNewConflict = { ...sixStates, FakeState: 154 };
// const twoClusters = {
//   ...sixStates,
//   Alaska: 162,
//   Delaware: 170,
//   Massachusetts: 181
// };
//
// const ls = new LabelSpacer(whatsupwiththis);
// ls.print();

export function labelSpacer(
  yValueObject,
  conflictHeight = 10,
  conflictPadding = 1
) {
  const ls = new LabelSpacer(yValueObject, conflictHeight, conflictPadding);
  return ls.export();
}
