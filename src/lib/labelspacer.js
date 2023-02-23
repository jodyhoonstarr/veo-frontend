import { PriorityQueue } from "@/lib/priorityqueue";
import { linSpace } from "@/lib/linspace";

class LabelSpacer {
  constructor(yPositions, heightPx = 10, paddingPx = 1, maxHeight = 400) {
    this.labelMap = new Map(); // store the label attributes
    this.clusters = {}; // store the attributes for clusters of labels
    this.conflictSize = this.generateConflictSize(heightPx, paddingPx);

    // if d3 decides the maxheight should be out of range, set it to max +1
    const maxYVal = Math.max(
      ...Object.keys(yPositions).map(k => yPositions[k])
    );
    if (maxYVal > maxHeight) {
      maxHeight = maxYVal + this.conflictSize / 2;
    }
    // jam a 0 starting value and a max height into the positions to denote the endpoints
    const newYPositions = { ...yPositions, start: 0, end: maxHeight };

    // take a set of key-value pairs and sort them
    // store the values in a map to lock the order
    Object.keys(newYPositions)
      .sort((a, b) => newYPositions[a] - newYPositions[b])
      .map((key, idx) => {
        this.labelMap.set(idx, {
          name: key,
          value: newYPositions[key],
          ascending: {
            distanceToNext: null,
            distanceNeeded: null,
            accumulator: 0
          },
          descending: {
            distanceToNext: null,
            distanceNeeded: null,
            accumulator: 0
          },
          cluster: null
        });
      });

    this.calculateAscending();
    this.calculateDescending();
    this.flagClusters();
    // if there's at least one cluster, process the space
    if (Object.prototype.hasOwnProperty.call(this.clusters, "1")) {
      this.claimNeighboringClusterSpace();
    }
  }

  // update the cluster attribute data
  updateClusterProps(clusterID, prop, value) {
    let clusterProps;
    if ( Object.prototype.hasOwnProperty.call(this.clusters, clusterID)) {
      clusterProps = this.clusters[clusterID];
    } else {
      clusterProps = { mapIDs: [], min: null, max: null };
    }
    clusterProps[prop] = value;
    this.clusters[clusterID] = clusterProps;
  }

  // update the cluster count
  updateClusterList(clusterID, key) {
    let clusterProps;
    if (Object.prototype.hasOwnProperty.call(this.clusters, clusterID)) {
      clusterProps = this.clusters[clusterID];
    } else {
      clusterProps = { mapIDs: [], min: null, max: null };
    }
    clusterProps.mapIDs.push(key);
    this.clusters[clusterID] = clusterProps;
  }

  // assign a clusterID to each item
  flagClusters() {
    let clusterID = 0;
    let clusterPattern = { asc: null, desc: null };
    let clusterSum = null;
    let clusterFlag = false;
    this.labelMap.forEach((value, key, map) => {
      if (value.name === "start" || value.name === "end") {
        return; // don't flag the injected start/end as parts of the cluster
      }

      const next = map.get(key + 1);
      // if the next accumulator is zero and the current one isn't, start cluster
      if (
        !clusterFlag &&
        (value.ascending.accumulator !== 0 ||
          value.descending.accumulator !== 0)
      ) {
        clusterFlag = true;
        clusterID += 1;
        clusterPattern.asc = value.ascending.accumulator;
        clusterPattern.desc = value.descending.accumulator;
        clusterSum = value.ascending.accumulator + value.descending.accumulator;
        this.updateClusterProps(clusterID, "min", {
          value: value.value,
          needed: value.descending.accumulator,
          available: value.descending.distanceToNext - this.conflictSize
        });
      }

      if (clusterFlag) {
        value.cluster = clusterID; // assign the cluster ida
        this.updateClusterList(clusterID, key);
      }

      // close the cluster by:
      // 1) look for the start or end entries
      // 2) look for the inverse pattern (e.g. asc:1 desc:0 should match asc:0 desc:1)
      // 3) or that the sum of the asc/desc matches the start sum
      if (
        value.cluster != null &&
        (next.name === "start" ||
          next.name === "end" ||
          (value.ascending.accumulator === clusterPattern.desc &&
            value.descending.accumulator === clusterPattern.asc &&
            (next.ascending.accumulator !== clusterPattern.desc ||
              next.descending.accumulator !== clusterPattern.asc)) ||
          (value.ascending.accumulator + value.descending.accumulator ===
            clusterSum &&
            next.ascending.accumulator + next.descending.accumulator !==
              clusterSum))
      ) {
        clusterFlag = false;
        clusterPattern.asc = null;
        clusterPattern.desc = null;
        clusterSum = null;
        this.updateClusterProps(clusterID, "max", {
          value: value.value,
          needed: value.ascending.accumulator,
          available: value.ascending.distanceToNext - this.conflictSize
        });
      }
    });
  }

  // flip min and max
  reverseMinMax(val) {
    if (val === "min" || val === "max") {
      return val === "min" ? "max" : "min";
    }
  }

  // subtract from the min, add to the max
  minMaxOperator(val) {
    if (val === "min" || val === "max") {
      return val === "min" ? -1 : 1;
    }
  }

  // format and space the cluster data
  claimNeighboringClusterSpace() {
    // get all of the available space from the cluster data
    const availArray = Object.keys(this.clusters).flatMap(clusterID => {
      return [
        this.clusters[clusterID].min.available,
        this.clusters[clusterID].max.available
      ];
    });

    // add all distinct values to a priority queue
    const spaceQueue = new PriorityQueue();
    new Set(availArray).forEach(o => {
      spaceQueue.push(o, o);
    });

    const emergencyBrake = 1000; // hard limit
    let ctr = 0;

    // claim the space available if neighboring clusters can overlap
    // iterate through from least available -> most available space
    while (spaceQueue.size() !== 0 && ctr < emergencyBrake) {
      ctr += 1;
      let v = spaceQueue.pop();

      let matchedClusters = [];
      Object.keys(this.clusters).forEach(k => {
        if (
          this.clusters[k].min.available === v ||
          this.clusters[k].max.available === v
        ) {
          matchedClusters.push(k);
        }
      });

      matchedClusters.forEach(m => {
        // cluster objects have a {id: [], min: {}, max: {}} format
        // find claim all available side on with the least space (e.g. min)
        // then claim all on the other side (e.g. max)

        // claim all available space on the minimum side if v is matched, or min (thisSide)
        let matchedSide;
        if (this.clusters[m].min.available === v) {
          matchedSide = "min";
        } else if (this.clusters[m].max.available === v) {
          matchedSide = "max";
        } else {
          matchedSide =
            this.clusters[m].min.available < this.clusters[m].max.available
              ? "min"
              : "max";
        }

        const thisSide = this.clusters[m][matchedSide];
        const otherSide = this.reverseMinMax(matchedSide);
        const thatSide = this.clusters[m][otherSide];

        const availableOnThisSide = thisSide.available; // copy value for use below

        // take half the space on each side of the cluster if available
        // otherwise take all of the minimum side
        let thisSpaceToClaim;
        const spaceToTake = Math.min(thisSide.needed, thisSide.available);
        const spaceToCenter = Math.floor(spaceToTake / 2);
        if (thatSide.available >= spaceToCenter) {
          thisSpaceToClaim = spaceToCenter;
        } else {
          thisSpaceToClaim = spaceToTake;
        }

        thisSide.value += thisSpaceToClaim * this.minMaxOperator(matchedSide); //e.g. subtract from min
        thisSide.needed -= thisSpaceToClaim;
        thisSide.available -= thisSpaceToClaim;

        // if all the needed space is taken from one side, set the other needed to zero
        // otherwise set the other needed side to the remainder needed
        thatSide.needed = thisSide.needed;

        // if the values were changed then update the queue
        if (thisSpaceToClaim > 0) {
          // push the new value into the priority queue
          // if it's new and not already there or zero
          if (
            !(
              v === thisSide.available ||
              spaceQueue.includes(thisSide.available)
            )
          ) {
            spaceQueue.push(thisSide.available, thisSide.available);
          }
        }

        // remove the available space from the neighbor cluster if touching
        const neighborOnThisSide = Object.prototype.hasOwnProperty.call(
          this.clusters, 
          parseInt(m) + this.minMaxOperator(matchedSide)
        )
          ? this.clusters[parseInt(m) + this.minMaxOperator(matchedSide)][
              this.reverseMinMax(matchedSide)
            ]
          : null;
        if (
          neighborOnThisSide &&
          neighborOnThisSide.available === availableOnThisSide
        ) {
          neighborOnThisSide.available -= thisSpaceToClaim;
        }

        // Remove any space claimed on the other side (thatSide)
        thatSide.needed -= thisSpaceToClaim;

        // claim the rest of the needed space
        const availableOnThatSide = thatSide.available; // copy value for use below
        const thatSpaceToClaim = Math.min(thatSide.needed, thatSide.available);
        thatSide.value += thatSpaceToClaim * this.minMaxOperator(otherSide);
        thatSide.needed -= thatSpaceToClaim;
        thatSide.available -= thatSpaceToClaim;

        // if the values were changed then update queue
        if (thatSpaceToClaim > 0) {
          // push the new value into the priority queue
          // if it's new and not already there
          if (
            !(
              v === thatSide.available ||
              spaceQueue.includes(thatSide.available)
            )
          ) {
            spaceQueue.push(thatSide.available, thatSide.available);
          }
        }

        // remove the available space from the neighbor cluster if touching
        const neighborOnThatSide = Object.prototype.hasOwnProperty.call(
          this.clusters,
          parseInt(m) + this.minMaxOperator(otherSide)
        )
          ? this.clusters[parseInt(m) + this.minMaxOperator(otherSide)][
              this.reverseMinMax(otherSide)
            ]
          : null;
        if (
          neighborOnThatSide &&
          neighborOnThatSide.available === availableOnThatSide
        ) {
          neighborOnThatSide.available -= thatSpaceToClaim;
        }
      });
    }
  }

  // generate the size that should be used for conflict detection
  generateConflictSize(height, padding) {
    return height + padding * 2;
  }

  // iterate through the logic in ascending order to get one bound
  calculateAscending() {
    this.labelMap.forEach((value, key, map) => {
      if (key !== map.size - 1) {
        const next = map.get(key + 1);
        this.processLogic(value, next, "ascending");
      }
    });
  }

  // iterate through the logic in descending order to get the other bound
  calculateDescending() {
    const reversed = [...this.labelMap].reverse();
    reversed.forEach(([key, value]) => {
      if (key !== 0) {
        const next = reversed.find(o => o[0] === key - 1)[1];
        this.processLogic(value, next, "descending");
      }
    });
  }

  // unified logic process for both ascending and descending ordering
  processLogic(value, next, direction) {
    if (value.name === "start" || value.name === "end") {
      return; // don't process the injected start/end
    }

    if (direction === "ascending") {
      value[direction].distanceToNext = next.value - value.value;
    } else if (direction === "descending") {
      value[direction].distanceToNext = value.value - next.value;
    } else {
      return;
    }

    // if the space needed is smaller than the conflict size, calculate needed space
    if (value[direction].distanceToNext < this.conflictSize) {
      value[direction].distanceNeeded =
        this.conflictSize - value[direction].distanceToNext;
    }

    // reset the accumulator if the distance to next can fit
    // all the accumulated values
    const dtn = value[direction].distanceToNext;
    const dn = value[direction].distanceNeeded || 0;
    const accum = value[direction].accumulator;

    if (dtn >= dn + accum + this.conflictSize) {
      // don't touch the start/end points
      if (next.name !== "start" && next.name !== "end") {
        next[direction].accumulator = 0;
      }
    } else {
      // don't touch the start/end points
      if (next.name !== "start" && next.name !== "end") {
        // set the next accumulator on the next item
        next[direction].accumulator =
          value[direction].accumulator + value[direction].distanceNeeded;
      }
    }
  }

  // export a new lookup object
  export() {
    // generate a lookup for the linearly spaced values
    const spacedValuesByID = {};
    Object.keys(this.clusters).map(clusterID => {
      const cluster = this.clusters[clusterID];
      const clusterSpacing = linSpace(
        cluster.min.value,
        cluster.max.value,
        cluster.mapIDs.length
      );
      cluster.mapIDs.map((mapID, idx) => {
        spacedValuesByID[mapID] = clusterSpacing[idx];
      });
    });

    // update the stored data
    this.labelMap.forEach((value, key) => {
      if (value.name === "start" || value.name === "end") {
        value.value = undefined;
      } else {
        value.value = spacedValuesByID[key] || value.value;
      }
    });

    // export the new values
    const returnObject = {};
    this.labelMap.forEach(v => {
      if (v.value) {
        returnObject[v.name] = v.value;
      }
    });
    return returnObject;
  }
}

// equally space labels out given a set height and padding
// where overlaps cant occur
export function labelSpacer(
  yValueObject,
  conflictHeight = 10,
  conflictPadding = 0,
  maxHeight = 400
) {
  if (yValueObject != null) {
    const ls = new LabelSpacer(
      yValueObject,
      conflictHeight,
      conflictPadding,
      maxHeight
    );
    return ls.export();
  }
}
