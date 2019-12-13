<template>
  <div>
    <h1 class="text-center">This is the Detailed Occupation page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="9">
        <DetailDropDown
          label="Occupation"
          hint="Detailed Occupation"
          :items="occupations"
          v-model="selectedOccupations"
          multiple
          close
        ></DetailDropDown>
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
import DetailDropDown from "@/components/DetailDropDown.vue";

export default {
  name: "DetailedOccupation",
  components: {
    SelectBar,
    DropDown,
    DetailDropDown
  },
  data() {
    return {
      //TODO get full list of detailed occs
      selectedOccupations: [],
      selectedCohort: [],
      occupations: [
        {
          id: "101",
          label: "Infantry, General",
          details:
            "Infantryman (11B), Indirect Fire Infantryman (11C), Infantry Senior Sergeant (11Z), Special Forces Weapons Sergeant (18B), Special Forces Engineer Sergeant (18C), Special Forces Medical Sergeant (18D), Special Forces Communications Sergeant (18E), Special Forces Assistant Operations and Intelligence Sergeant (18F), Special Forces Senior Sergeant (18Z)"
        },
        {
          id: "102",
          label: "Armor and Amphibious, General",
          details: "M1 Armor Crewman (19K), Armor Senior Sergeant (19Z)"
        },
        {
          id: "103",
          label: "Combat Engineering, General",
          details:
            "Engineer Senior Sergeant (12A), Combat Engineer (12B), Bridge Crewmember (12C), Combat Engineering Senior Sergeant (12Z)"
        },
        {
          id: "104",
          label: "Missile Artillery, Operating Crew",
          details:
            "Cannon Crewmember (13B), Field Artillery Senior Sergeant (13Z), Multiple Launch Rocket System (MLRS)/High Mobility Artillery Rocket System (HIMARS) Crewmember (13M), PATRIOT Fire Control Enhanced Operator/Maintainer (14E), Air Defense Battle Management System Operator (14G), Air Defense Enhanced Early Warning System Operator (14H), Air and Missle Defense Crewmember (14P), AVENGER Crewmember (14S), PATRIOT Launching Station Enhanced Operator/Maintainer (14T), Space and Missle Defense Opartions (14X), Air Defense Artillery Senior Sergeant (14Z)"
        },
        {
          id: "106",
          label: "Small Boat Operators",
          details: "Watercraft Operator (88K)"
        },
        {
          id: "108",
          label: "Unmanned Vehicle System (UVS) Operators, General",
          details: "Unmanned Aircraft Systems (UAS Operator) (15W)"
        },
        {
          id: "110",
          label: "Navigation, Communication, and Countermeasure, N.E.C.",
          details:
            "Microwave System Operator-Maintainer (25P), Signal Support Systems Specialist (25U), Radio Equipment Repairer (94E), Electronic Maintenance Supervisor (94W), Senior Electronic Maintenance Supervisor (94Z), Avionic Mechanic (15N), Multichannel Transmission System Operator-Maintainer (25Q), Satellite Communications System Operator-Maintainer (25S), Satellite/Microwave Systems Chief (25T), Military Intelligence Systems Maintainer/Integrator (35T), Avionic and Survivability Equipment Repairer (94R), Air Traffic Control Equipment Repairer (94D), Radar Repairer (94M)"
        },
        {
          id: "112",
          label: "Missile Guidance and Control",
          details:
            "Land Combat Electronic Missle System Repairer (94A), Multiple Launch Rocket System Repairer (94P), PATRIOT System Repairer (94S), Short Range Air Defense System Repairer (94T)"
        },
        {
          id: "120",
          label: "Radio Operators",
          details:
            "Radio Operator-Maintainer (25C), Electromagnetic Spectrum Manager (25E)"
        },
        {
          id: "122",
          label: "Air Traffic Control",
          details:
            "Field Artillery (FA) Firefinder Radar Operator (13R), Air Traffice Control Operator (15Q)"
        },
        {
          id: "123",
          label: "Intercept Operators (Code and Non",
          details:
            "Cryptologic Network Warfare Specialist (35Q), Chief Signals Intelligence Sergeant (35V), Signals Intelligence Senior Sergeant/SIGINT Chief (35Z), Signals Intelligence (SIGINT) Voice Interceptor (35P), Signals Intelligence Analyst (35N), Electronic Warfare Specialist (17E), Signals Collector/Analyst (35S)"
        },
        {
          id: "124",
          label: "Operational Intelligence",
          details:
            "Interpreter/Translator (09L), Human Intelligence Collector (35M), Geospatial Intelligence Imagery Analyst (35G), Intelligence Analyst (35F), Intelligence Senior Sergeant/Chief Intelligence Sergeant (35X), Pyschological Operations Specialist (37F), Counter Intelligence Agent (35L), Chief Counterintelligence/Human Intelligence Sergeant (35Y)"
        },
        {
          id: "125",
          label: "Combat Operations Control, General",
          details:
            "Joint Fire Support Specialist (13F), Fire Control Specialist (13J), Cavalary Scout (19D)"
        },
        {
          id: "126",
          label: "Communications Center Operations,General",
          details:
            "Nodal Network Systems Operator-Maintainer (25N), Telecommunications Operations Chief (25W), Chief Signal NCO (25X)"
        },
        {
          id: "127",
          label: "Cyberspace Operations, General",
          details:
            "Cyber Operations Specialist (17C), Cyber Network Defender (25D)"
        },
        {
          id: "130",
          label: "Medical Care and Treatment, General",
          details:
            "Cardiovascular Specialist (68N), ENT Specialist (68U), Combat Medic Specialist (68W), Chief Medical NCO (68Z), Operating Room Specialist (68D), Behavioral Health Specialist (68X), Physical Therapy Specialist (68F), Occupational Therapy Specialist (68L), Orthopedic Specialist (68B), Practical Nursing Specialist (68C), Respiratory Specialist (68V)"
        },
        {
          id: "131",
          label: "Radiology",
          details:
            "Medical Laboratory Specialist (68K), Pharmacy Specialist (68Q), Radiology Specialist (68P)"
        },
        {
          id: "132",
          label: "Diet Therapy",
          details:
            "Preventive Medicine Specialist (68S), Optical Laboratory Specialist (68H), Eye Specialist (68Y), Nutrition Care Specialist (68M), Biomedical Equipment Specialist (68A)"
        },
        {
          id: "133",
          label: "Dental Care, General",
          details: "Dental Specialist (68E)"
        },
        {
          id: "134",
          label: "Medical Administration",
          details:
            "Patient Administration Specialist (68G), Medical Logistics Specialist (68J)"
        },
        {
          id: "140",
          label: "Photography, General",
          details:
            "Multimedia Illustrator (25M), Visual Information Equipment Operator-Maintainer (25R), Combat Documentation/Production Specialist (25V), Visual Information Operations Chief (25Z)"
        },
        {
          id: "141",
          label: "Surveying",
          details: "Geospatial Engineer (12Y), Technical Engineer (12T)"
        },
        {
          id: "143",
          label: "EOD/UDT",
          details: "Explosive Ordnance Disposal Specialist (89D), Diver (12D)"
        },
        {
          id: "145",
          label: "Musicians, General",
          details: "Musician (42R), Special Band Musician (42S)"
        },
        {
          id: "150",
          label: "Recruiting and Counseling",
          details:
            "Recruiter (79R), Career Counselor (79S), recruiting and Retention NCO (79T), Army Reserve Career Counselor (79V)"
        },
        { id: "151", label: "Legal", details: "Paralegal Specialist (27D)" },
        {
          id: "153",
          label: "Operators/Analysts/Programmers",
          details: "Information Technology Specialist (25B)"
        },
        {
          id: "154",
          label: "Disbursing",
          details: "Financial Management Technician (36B)"
        },
        {
          id: "155",
          label: "Supply Administration",
          details:
            "Contracting Noncommissioned Officer (NCO) (51C), Automated Logistical Specialist (92A), Unit Supply Specialist (92Y), Senior Noncommissioned Logistician (92Z), Transportation Management Coordinator (88N), Aviation Operations Specialist (15P)"
        },
        {
          id: "156",
          label: "Chaplain's Assistants",
          details: "Religious Affairs Specialist (56M)"
        },
        {
          id: "157",
          label: "Information and Education, General",
          details:
            "Civil Affairs Specialist (38B), Pulic Affairs Mass Communications Specialist (46S), Chief Public Affairs NCO (46Z)"
        },
        {
          id: "160",
          label: "Aircraft, General",
          details:
            "Unmanned Aircraft Systems Repairer (15E), AH-64 Attack Hellicopter Repairer (15R), OH-58D Helicopter Repairer (15S), UH-60 Helicopter Repairer (15T), CH-47 Helicopter Repairer (15U), Aviation Senior Sergeant (15Z), Aircraft Powerplant Repairer (15B), Aircraft Powertrain Repairer (15D), Aircraft Electrician (15F), Aircraft Pneudraulics Repairer (15H), OH-58D/Armament/Electrical/Avionics Systems Repairer (15J), Aircraft Components Repair Supervisor (15K), Aircraft Structural Repairer (15G)"
        },
        {
          id: "162",
          label: "Lineman/Central Office",
          details: "Cable Systems Installer-Maintainer (25L)"
        },
        {
          id: "164",
          label: "Aviation Ordnance",
          details:
            "Small Arms/Towed Artillery Repairer (91F), Ammunition Stock Control and Accounting Specialist (89A), Ammunition Specialist (89B), AH-64D Armament/Electrical/Avionics Systems Repairer (15Y)"
        },
        {
          id: "165",
          label: "Auxiliaries",
          details: "Watercraft Engineer (88L)"
        },
        {
          id: "166",
          label: "Electric Power",
          details:
            "Prime Power Production Specialist (12P), Tactical Power Generation Specialist (91D)"
        },
        {
          id: "169",
          label: "Other Mechanical and Electrical Equipment, General",
          details: "Quartermaster and Chemical Equipment Repairer (91J)"
        },
        {
          id: "170",
          label: "Metal Body Repair",
          details: "Allied Trades Specialist (91E)"
        },
        {
          id: "171",
          label: "Construction Equipment Operation",
          details:
            "Construction Engineering Supervisor (12H), General Engineering Supervisor (12X), Carpentry and Masonry Specialist (12W), Quarrying Specialist (RC) (12G), Horizontal Construction Engineer (12N), Concrete and Asphalt Equipment Operator (12V)"
        },
        {
          id: "172",
          label: "Utilities, General",
          details:
            "Plumber (12K), Utilities Equipment Repairer (91C), Water Treatment Specialist (92W), Powerline Distribution Specialist (RC) (12Q), Interior Electrician (12R)"
        },
        {
          id: "180",
          label: "Food Service, General",
          details: "Culinary Specialist (92G)"
        },
        {
          id: "181",
          label: "Motor Vehicle Operators",
          details:
            "Motor Transport Operator (88M), Transportation Senior Sergeant (88Z), Railway Specialist (USAR only) (88U)"
        },
        {
          id: "182",
          label: "Missile Fuel and Petroleum",
          details: "Petroleum Supply Specialist (92F), Cargo Specialist (88H)"
        },
        {
          id: "183",
          label: "Law Enforcement, General",
          details:
            "Military Police (31B), Military Working Dog Handler (31K), Senior Military Police Sergeant (31Z), Corrections and Detention Specialist (31E), CID Special Agent (31D)"
        },
        {
          id: "184",
          label: "Laundry and Personal Service, General",
          details: "Shower and Laundry Specialist (92S)"
        },
        {
          id: "186",
          label: "Forward Area Equipment Support, General",
          details: "Parachute Rigger (92R)"
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
