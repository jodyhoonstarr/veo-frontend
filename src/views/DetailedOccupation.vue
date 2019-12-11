<template>
  <div>
    <h1 class="text-center">This is the Detailed Occupation page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="9">
        <SearchableDropDown
          label="Occupation"
          hint="Detailed Occupation"
          :items="occupations"
          v-model="selectedOccupations"
          multiple
        ></SearchableDropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown label="Cohort" hint="Year of discharge" :items="cohorts" v-model="selectedCohort"></DropDown>
      </v-col>
    </SelectBar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";
import SearchableDropDown from "@/components/SearchableDropDown.vue";

export default {
  name: "DetailedOccupation",
  components: {
    SelectBar,
    DropDown,
    SearchableDropDown
  },
  data() {
    return {
      //TODO get full list of detailed occs
      //TODO consider removing hardcode
      //TODO duplicates being returned to state
      selectedOccupations: [],
      selectedCohort: [],
      occupations: [
        { id: "101", label: "Infantry, General" },
        { id: "101", label: "Infantry, General (Infantryman 11B)" },
        {
          id: "101",
          label: "Infantry, General (Indirect Fire Infantryman 11C)"
        },
        {
          id: "101",
          label: "Infantry, General (Infantry Senior Sergeant 11Z)"
        },
        {
          id: "101",
          label: "Infantry, General (Special Forces Weapons Sergeant 18B)"
        },
        {
          id: "101",
          label: "Infantry, General (Special Forces Engineer Sergeant 18C)"
        },
        {
          id: "101",
          label: "Infantry, General (Special Forces Medical Sergeant 18D)"
        },
        {
          id: "101",
          label:
            "Infantry, General (Special Forces Communications Sergeant 18E)"
        },
        {
          id: "101",
          label:
            "Infantry, General (Special Forces Assistant Operations and Intelligence Sergeant 18F)"
        },
        {
          id: "101",
          label: "Infantry, General (Special Forces Senior Sergeant 18Z)"
        },
        { id: "102", label: "Armor and Amphibious, General" },
        {
          id: "102",
          label: "Armor and Amphibious, General (M1 Armor Crewman 19K)"
        },
        {
          id: "102",
          label: "Armor and Amphibious, General (Armor Senior Sergeant 19Z)"
        },
        { id: "103", label: "Combat Engineering, General" },
        {
          id: "103",
          label: "Combat Engineering, General (Engineer Senior Sergeant 12A)"
        },
        {
          id: "103",
          label: "Combat Engineering, General (Combat Engineer 12B)"
        },
        {
          id: "103",
          label: "Combat Engineering, General (Bridge Crewmember 12C)"
        },
        {
          id: "103",
          label:
            "Combat Engineering, General (Combat Engineering Senior Sergeant 12Z)"
        },
        { id: "104", label: "Missile Artillery, Operating Crew" },
        {
          id: "104",
          label: "Missile Artillery, Operating Crew (Cannon Crewmember 13B)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (Field Artillery Senior Sergeant 13Z)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (Multiple Launch Rocket System (MLRS)/High Mobility Artillery Rocket System (HIMARS) Crewmember 13M)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (PATRIOT Fire Control Enhanced Operator/Maintainer 14E)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (Air Defense Battle Management System Operator 14G)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (Air Defense Enhanced Early Warning System Operator 14H)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (Air and Missle Defense Crewmember 14P)"
        },
        {
          id: "104",
          label: "Missile Artillery, Operating Crew (AVENGER Crewmember 14S)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (PATRIOT Launching Station Enhanced Operator/Maintainer 14T)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (Space and Missle Defense Opartions 14X)"
        },
        {
          id: "104",
          label:
            "Missile Artillery, Operating Crew (Air Defense Artillery Senior Sergeant 14Z)"
        },
        { id: "106", label: "Small Boat Operators" },
        { id: "106", label: "Small Boat Operators (Watercraft Operator 88K)" },
        {
          id: "108",
          label: "Unmanned Vehicle System (UVS) Operators, General"
        },
        {
          id: "108",
          label:
            "Unmanned Vehicle System (UVS) Operators, General (Unmanned Aircraft Systems (UAS Operator) 15W)"
        },
        {
          id: "110",
          label: "Navigation, Communication, and Countermeasure, N.E.C."
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Microwave System Operator-Maintainer 25P)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Signal Support Systems Specialist 25U)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Radio Equipment Repairer 94E)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Electronic Maintenance Supervisor 94W)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Senior Electronic Maintenance Supervisor 94Z)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Avionic Mechanic 15N)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Multichannel Transmission System Operator-Maintainer 25Q)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Satellite Communications System Operator-Maintainer 25S)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Satellite/Microwave Systems Chief 25T)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Military Intelligence Systems Maintainer/Integrator 35T)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Avionic and Survivability Equipment Repairer 94R)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Air Traffic Control Equipment Repairer 94D)"
        },
        {
          id: "110",
          label:
            "Navigation, Communication, and Countermeasure, N.E.C. (Radar Repairer 94M)"
        },
        { id: "111", label: "Shipboard and Other Fire Control" },
        { id: "112", label: "Missile Guidance and Control" },
        {
          id: "112",
          label:
            "Missile Guidance and Control (Land Combat Electronic Missle System Repairer 94A)"
        },
        {
          id: "112",
          label:
            "Missile Guidance and Control (Multiple Launch Rocket System Repairer 94P)"
        },
        {
          id: "112",
          label: "Missile Guidance and Control (PATRIOT System Repairer 94S)"
        },
        {
          id: "112",
          label:
            "Missile Guidance and Control (Short Range Air Defense System Repairer 94T)"
        },
        { id: "115", label: "ADP Computers, General" },
        { id: "116", label: "Teletype and Cryptographic Equipment, General" },
        { id: "119", label: "Electronic Instruments, N.E.C." },
        { id: "120", label: "Radio Operators" },
        { id: "120", label: "Radio Operators (Radio Operator-Maintainer 25C)" },
        {
          id: "120",
          label: "Radio Operators (Electromagnetic Spectrum Manager 25E)"
        },
        { id: "122", label: "Air Traffic Control" },
        {
          id: "122",
          label:
            "Air Traffic Control (Field Artillery (FA) Firefinder Radar Operator 13R)"
        },
        {
          id: "122",
          label: "Air Traffic Control (Air Traffice Control Operator 15Q)"
        },
        { id: "123", label: "Intercept Operators (Code and Non" },
        {
          id: "123",
          label:
            "Intercept Operators (Code and Non (Cryptologic Network Warfare Specialist 35Q)"
        },
        {
          id: "123",
          label:
            "Intercept Operators (Code and Non (Chief Signals Intelligence Sergeant 35V)"
        },
        {
          id: "123",
          label:
            "Intercept Operators (Code and Non (Signals Intelligence Senior Sergeant/SIGINT Chief 35Z)"
        },
        {
          id: "123",
          label:
            "Intercept Operators (Code and Non (Signals Intelligence (SIGINT) Voice Interceptor 35P)"
        },
        {
          id: "123",
          label:
            "Intercept Operators (Code and Non (Signals Intelligence Analyst 35N)"
        },
        {
          id: "123",
          label:
            "Intercept Operators (Code and Non (Electronic Warfare Specialist 17E)"
        },
        {
          id: "123",
          label:
            "Intercept Operators (Code and Non (Signals Collector/Analyst 35S)"
        },
        { id: "124", label: "Operational Intelligence" },
        {
          id: "124",
          label: "Operational Intelligence (Interpreter/Translator 09L)"
        },
        {
          id: "124",
          label: "Operational Intelligence (Human Intelligence Collector 35M)"
        },
        {
          id: "124",
          label:
            "Operational Intelligence (Geospatial Intelligence Imagery Analyst 35G)"
        },
        {
          id: "124",
          label: "Operational Intelligence (Intelligence Analyst 35F)"
        },
        {
          id: "124",
          label:
            "Operational Intelligence (Intelligence Senior Sergeant/Chief Intelligence Sergeant 35X)"
        },
        {
          id: "124",
          label:
            "Operational Intelligence (Pyschological Operations Specialist 37F)"
        },
        {
          id: "124",
          label: "Operational Intelligence (Counter Intelligence Agent 35L)"
        },
        {
          id: "124",
          label:
            "Operational Intelligence (Chief Counterintelligence/Human Intelligence Sergeant 35Y)"
        },
        { id: "125", label: "Combat Operations Control, General" },
        {
          id: "125",
          label:
            "Combat Operations Control, General (Joint Fire Support Specialist 13F)"
        },
        {
          id: "125",
          label:
            "Combat Operations Control, General (Fire Control Specialist 13J)"
        },
        {
          id: "125",
          label: "Combat Operations Control, General (Cavalary Scout 19D)"
        },
        { id: "126", label: "Communications Center Operations,General" },
        {
          id: "126",
          label:
            "Communications Center Operations,General (Nodal Network Systems Operator-Maintainer 25N)"
        },
        {
          id: "126",
          label:
            "Communications Center Operations,General (Telecommunications Operations Chief 25W)"
        },
        {
          id: "126",
          label:
            "Communications Center Operations,General (Chief Signal NCO 25X)"
        },
        { id: "127", label: "Cyberspace Operations, General" },
        {
          id: "127",
          label:
            "Cyberspace Operations, General (Cyber Operations Specialist 17C)"
        },
        {
          id: "127",
          label: "Cyberspace Operations, General (Cyber Network Defender 25D)"
        },
        { id: "130", label: "Medical Care and Treatment, General" },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Cardiovascular Specialist 68N)"
        },
        {
          id: "130",
          label: "Medical Care and Treatment, General (ENT Specialist 68U)"
        },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Combat Medic Specialist 68W)"
        },
        {
          id: "130",
          label: "Medical Care and Treatment, General (Chief Medical NCO 68Z)"
        },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Operating Room Specialist 68D)"
        },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Behavioral Health Specialist 68X)"
        },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Physical Therapy Specialist 68F)"
        },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Occupational Therapy Specialist 68L)"
        },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Orthopedic Specialist 68B)"
        },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Practical Nursing Specialist 68C)"
        },
        {
          id: "130",
          label:
            "Medical Care and Treatment, General (Respiratory Specialist 68V)"
        },
        { id: "131", label: "Radiology" },
        { id: "131", label: "Radiology (Medical Laboratory Specialist 68K)" },
        { id: "131", label: "Radiology (Pharmacy Specialist 68Q)" },
        { id: "131", label: "Radiology (Radiology Specialist 68P)" },
        { id: "132", label: "Diet Therapy" },
        {
          id: "132",
          label: "Diet Therapy (Preventive Medicine Specialist 68S)"
        },
        {
          id: "132",
          label: "Diet Therapy (Optical Laboratory Specialist 68H)"
        },
        { id: "132", label: "Diet Therapy (Eye Specialist 68Y)" },
        { id: "132", label: "Diet Therapy (Nutrition Care Specialist 68M)" },
        {
          id: "132",
          label: "Diet Therapy (Biomedical Equipment Specialist 68A)"
        },
        { id: "133", label: "Dental Care, General" },
        { id: "133", label: "Dental Care, General (Dental Specialist 68E)" },
        { id: "134", label: "Medical Administration" },
        {
          id: "134",
          label:
            "Medical Administration (Patient Administration Specialist 68G)"
        },
        {
          id: "134",
          label: "Medical Administration (Medical Logistics Specialist 68J)"
        },
        { id: "140", label: "Photography, General" },
        {
          id: "140",
          label: "Photography, General (Multimedia Illustrator 25M)"
        },
        {
          id: "140",
          label:
            "Photography, General (Visual Information Equipment Operator-Maintainer 25R)"
        },
        {
          id: "140",
          label:
            "Photography, General (Combat Documentation/Production Specialist 25V)"
        },
        {
          id: "140",
          label:
            "Photography, General (Visual Information Operations Chief 25Z)"
        },
        { id: "141", label: "Surveying" },
        { id: "141", label: "Surveying (Geospatial Engineer 12Y)" },
        { id: "141", label: "Surveying (Technical Engineer 12T)" },
        { id: "142", label: "Weather, General" },
        { id: "143", label: "EOD/UDT" },
        {
          id: "143",
          label: "EOD/UDT (Explosive Ordnance Disposal Specialist 89D)"
        },
        { id: "143", label: "EOD/UDT (Diver 12D)" },
        { id: "145", label: "Musicians, General" },
        { id: "145", label: "Musicians, General (Musician 42R)" },
        { id: "145", label: "Musicians, General (Special Band Musician 42S)" },
        { id: "149", label: "Firefighting and damage Control" },
        { id: "150", label: "Recruiting and Counseling" },
        { id: "150", label: "Recruiting and Counseling (Recruiter 79R)" },
        {
          id: "150",
          label: "Recruiting and Counseling (Career Counselor 79S)"
        },
        {
          id: "150",
          label: "Recruiting and Counseling (recruiting and Retention NCO 79T)"
        },
        {
          id: "150",
          label: "Recruiting and Counseling (Army Reserve Career Counselor 79V)"
        },
        { id: "151", label: "Legal" },
        { id: "151", label: "Legal (Paralegal Specialist 27D)" },
        { id: "152", label: "Combined Personnel and Administration, General" },
        { id: "153", label: "Operators/Analysts/Programmers" },
        {
          id: "153",
          label:
            "Operators/Analysts/Programmers (Information Technology Specialist 25B)"
        },
        { id: "154", label: "Disbursing" },
        {
          id: "154",
          label: "Disbursing (Financial Management Technician 36B)"
        },
        { id: "155", label: "Supply Administration" },
        {
          id: "155",
          label:
            "Supply Administration (Contracting Noncommissioned Officer (NCO) 51C)"
        },
        {
          id: "155",
          label: "Supply Administration (Automated Logistical Specialist 92A)"
        },
        {
          id: "155",
          label: "Supply Administration (Unit Supply Specialist 92Y)"
        },
        {
          id: "155",
          label:
            "Supply Administration (Senior Noncommissioned Logistician 92Z)"
        },
        {
          id: "155",
          label:
            "Supply Administration (Transportation Management Coordinator 88N)"
        },
        {
          id: "155",
          label: "Supply Administration (Aviation Operations Specialist 15P)"
        },
        { id: "156", label: "Chaplain's Assistants" },
        {
          id: "156",
          label: "Chaplain's Assistants (Religious Affairs Specialist 56M)"
        },
        { id: "157", label: "Information and Education, General" },
        {
          id: "157",
          label:
            "Information and Education, General (Civil Affairs Specialist 38B)"
        },
        {
          id: "157",
          label:
            "Information and Education, General (Pulic Affairs Mass Communications Specialist 46S)"
        },
        {
          id: "157",
          label:
            "Information and Education, General (Chief Public Affairs NCO 46Z)"
        },
        { id: "160", label: "Aircraft, General" },
        {
          id: "160",
          label: "Aircraft, General (Unmanned Aircraft Systems Repairer 15E)"
        },
        {
          id: "160",
          label: "Aircraft, General (AH-64 Attack Hellicopter Repairer 15R)"
        },
        {
          id: "160",
          label: "Aircraft, General (OH-58D Helicopter Repairer 15S)"
        },
        {
          id: "160",
          label: "Aircraft, General (UH-60 Helicopter Repairer 15T)"
        },
        {
          id: "160",
          label: "Aircraft, General (CH-47 Helicopter Repairer 15U)"
        },
        {
          id: "160",
          label: "Aircraft, General (Aviation Senior Sergeant 15Z)"
        },
        {
          id: "160",
          label: "Aircraft, General (Aircraft Powerplant Repairer 15B)"
        },
        {
          id: "160",
          label: "Aircraft, General (Aircraft Powertrain Repairer 15D)"
        },
        { id: "160", label: "Aircraft, General (Aircraft Electrician 15F)" },
        {
          id: "160",
          label: "Aircraft, General (Aircraft Pneudraulics Repairer 15H)"
        },
        {
          id: "160",
          label:
            "Aircraft, General (OH-58D/Armament/Electrical/Avionics Systems Repairer 15J)"
        },
        {
          id: "160",
          label: "Aircraft, General (Aircraft Components Repair Supervisor 15K)"
        },
        {
          id: "160",
          label: "Aircraft, General (Aircraft Structural Repairer 15G)"
        },
        { id: "161", label: "Automotive, General" },
        { id: "162", label: "Lineman/Central Office" },
        {
          id: "162",
          label:
            "Lineman/Central Office (Cable Systems Installer-Maintainer 25L)"
        },
        { id: "164", label: "Aviation Ordnance" },
        {
          id: "164",
          label: "Aviation Ordnance (Small Arms/Towed Artillery Repairer 91F)"
        },
        {
          id: "164",
          label:
            "Aviation Ordnance (Ammunition Stock Control and Accounting Specialist 89A)"
        },
        { id: "164", label: "Aviation Ordnance (Ammunition Specialist 89B)" },
        {
          id: "164",
          label:
            "Aviation Ordnance (AH-64D Armament/Electrical/Avionics Systems Repairer 15Y)"
        },
        { id: "165", label: "Auxiliaries" },
        { id: "165", label: "Auxiliaries (Watercraft Engineer 88L)" },
        { id: "166", label: "Electric Power" },
        {
          id: "166",
          label: "Electric Power (Prime Power Production Specialist 12P)"
        },
        {
          id: "166",
          label: "Electric Power (Tactical Power Generation Specialist 91D)"
        },
        {
          id: "169",
          label: "Other Mechanical and Electrical Equipment, General"
        },
        {
          id: "169",
          label:
            "Other Mechanical and Electrical Equipment, General (Quartermaster and Chemical Equipment Repairer 91J)"
        },
        { id: "170", label: "Metal Body Repair" },
        {
          id: "170",
          label: "Metal Body Repair (Allied Trades Specialist 91E)"
        },
        { id: "171", label: "Construction Equipment Operation" },
        {
          id: "171",
          label:
            "Construction Equipment Operation (Construction Engineering Supervisor 12H)"
        },
        {
          id: "171",
          label:
            "Construction Equipment Operation (General Engineering Supervisor 12X)"
        },
        {
          id: "171",
          label:
            "Construction Equipment Operation (Carpentry and Masonry Specialist 12W)"
        },
        {
          id: "171",
          label:
            "Construction Equipment Operation (Quarrying Specialist (RC) 12G)"
        },
        {
          id: "171",
          label:
            "Construction Equipment Operation (Horizontal Construction Engineer 12N)"
        },
        {
          id: "171",
          label:
            "Construction Equipment Operation (Concrete and Asphalt Equipment Operator 12V)"
        },
        { id: "172", label: "Utilities, General" },
        { id: "172", label: "Utilities, General (Plumber 12K)" },
        {
          id: "172",
          label: "Utilities, General (Utilities Equipment Repairer 91C)"
        },
        {
          id: "172",
          label: "Utilities, General (Water Treatment Specialist 92W)"
        },
        {
          id: "172",
          label:
            "Utilities, General (Powerline Distribution Specialist (RC) 12Q)"
        },
        { id: "172", label: "Utilities, General (Interior Electrician 12R)" },
        { id: "174", label: "Lithography, General" },
        { id: "176", label: "Fabric, Leather, and Rubber, General" },
        { id: "180", label: "Food Service, General" },
        { id: "180", label: "Food Service, General (Culinary Specialist 92G)" },
        { id: "181", label: "Motor Vehicle Operators" },
        {
          id: "181",
          label: "Motor Vehicle Operators (Motor Transport Operator 88M)"
        },
        {
          id: "181",
          label: "Motor Vehicle Operators (Transportation Senior Sergeant 88Z)"
        },
        {
          id: "181",
          label: "Motor Vehicle Operators (Railway Specialist (USAR only) 88U)"
        },
        { id: "182", label: "Missile Fuel and Petroleum" },
        {
          id: "182",
          label: "Missile Fuel and Petroleum (Petroleum Supply Specialist 92F)"
        },
        {
          id: "182",
          label: "Missile Fuel and Petroleum (Cargo Specialist 88H)"
        },
        { id: "183", label: "Law Enforcement, General" },
        { id: "183", label: "Law Enforcement, General (Military Police 31B)" },
        {
          id: "183",
          label: "Law Enforcement, General (Military Working Dog Handler 31K)"
        },
        {
          id: "183",
          label:
            "Law Enforcement, General (Senior Military Police Sergeant 31Z)"
        },
        {
          id: "183",
          label:
            "Law Enforcement, General (Corrections and Detention Specialist 31E)"
        },
        {
          id: "183",
          label: "Law Enforcement, General (CID Special Agent 31D)"
        },
        { id: "184", label: "Laundry and Personal Service, General" },
        {
          id: "184",
          label:
            "Laundry and Personal Service, General (Shower and Laundry Specialist 92S)"
        },
        { id: "186", label: "Forward Area Equipment Support, General" },
        {
          id: "186",
          label:
            "Forward Area Equipment Support, General (Parachute Rigger 92R)"
        }
      ],
      cohorts: [
        { id: "2000", label: "2000-2007" },
        { id: "2008", label: "2008-2015" }
      ]
    };
  }
};
</script>
