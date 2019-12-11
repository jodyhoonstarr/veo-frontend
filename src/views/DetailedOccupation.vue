<template>
  <div>
    <h1 class="text-center">This is the Detailed Occupation page</h1>
  </div>
</template>

<script>
export default {
  name: "DetailedOccupation",
  data() {
    return {
      occupations: [
        { id: "101", label: "Infantry, General" },
        { id: "102", label: "Armor and Amphibious, General" },
        { id: "103", label: "Combat Engineering, General" },
        { id: "104", label: "Missile Artillery, Operating Crew" },
        { id: "106", label: "Small Boat Operators" },
        {
          id: "108",
          label: "Unmanned Vehicle System (UVS) Operators, General"
        },
        { id: "111", label: "Shipboard and Other Fire Control" },
        { id: "112", label: "Missile Guidance and Control" },
        { id: "115", label: "ADP Computers, General" },
        { id: "116", label: "Teletype and Cryptographic Equipment, General" },
        { id: "119", label: "Electronic Instruments, N.E.C." },
        { id: "120", label: "Radio Operators" },
        { id: "123", label: "Intercept Operators (Code and Non" },
        { id: "124", label: "Operational Intelligence" },
        { id: "125", label: "Combat Operations Control, General" },
        { id: "126", label: "Communications Center Operations,General" },
        { id: "127", label: "Cyberspace Operations, General" },
        { id: "130", label: "Medical Care and Treatment, General" },
        { id: "131", label: "Radiology" },
        { id: "133", label: "Dental Care, General" },
        { id: "134", label: "Medical Administration" },
        { id: "140", label: "Photography, General" },
        { id: "141", label: "Surveying" },
        { id: "142", label: "Weather, General" },
        { id: "145", label: "Musicians, General" },
        { id: "149", label: "Firefighting and damage Control" },
        { id: "150", label: "Recruiting and Counseling" },
        { id: "151", label: "Legal" },
        { id: "152", label: "Combined Personnel and Administration, General" },
        { id: "153", label: "Operators/Analysts/Programmers" },
        { id: "155", label: "Supply Administration" },
        { id: "156", label: "Chaplain's Assistants" },
        { id: "157", label: "Information and Education, General" },
        { id: "160", label: "Aircraft, General" },
        { id: "161", label: "Automotive, General" },
        { id: "162", label: "Lineman/Central Office" },
        { id: "164", label: "Aviation Ordnance" },
        { id: "165", label: "Auxiliaries" },
        {
          id: "169",
          label: "Other Mechanical and Electrical Equipment, General"
        },
        { id: "170", label: "Metal Body Repair" },
        { id: "171", label: "Construction Equipment Operation" },
        { id: "172", label: "Utilities, General" },
        { id: "174", label: "Lithography, General" },
        { id: "176", label: "Fabric, Leather, and Rubber, General" },
        { id: "181", label: "Motor Vehicle Operators" },
        { id: "182", label: "Missile Fuel and Petroleum" },
        { id: "183", label: "Law Enforcement, General" },
        { id: "184", label: "Laundry and Personal Service, General" },
        { id: "186", label: "Forward Area Equipment Support, General" }
      ],
      cohorts: [
        { id: "2000", label: "2000-2007" },
        { id: "2008", label: "2008-2015" }
      ]
    };
  }
};
</script>
