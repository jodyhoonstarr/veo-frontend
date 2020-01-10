<template>
  <div>
    <h1 class="text-center">This is the Detailed Occupation page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="9">
        <DetailDropDown
          label="Occupation"
          :items="occupations"
          v-model="selectedOccupations"
          clearable
          multiple
          close
        ></DetailDropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown label="Cohort" :items="cohorts" v-model="selectedCohort"></DropDown>
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
      selectedOccupations: [],
      selectedCohort: [],
      occupations: [
        {
          id: "101",
          label: "Infantry, General",
          details:
            "Special Forces Senior Sergeant (18Z), Infantry Senior Sergeant (11Z), Special Forces Communications Sergeant (18E), Heavy Antiarmor Weapons Infantryman (11H), Special Forces Assistant Operations and Intelligence Sergeant (18F), Indirect Fire Infantryman (11C), Infantry Senior Sergeant (11L), Infantryman (11B), Special Forces Engineer Sergeant (18C), Special Forces Weapons Sergeant (18B), Special Forces Medical Sergeant (18D), Fighting Vehicle Infantryman (11M)"
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
            "Combat Engineer (21B), Bridge Crewmember (12C), Combat Engineering Senior Sergeant (21Z), Engineer Senior Sergeant (12A), Combat Engineering Senior Sergeant (12Z), Bridge Crewmember (21C), Combat Engineer (12B)"
        },
        {
          id: "104",
          label: "Missile Artillery, Operating Crew",
          details:
            "BRADLEY LINEBACKER Crewmember (14R), Air Defense Artillery Senior Sergeant (14Z), Air Defense (AD) Battle Management System Operator (14G), HAWK Missile System Crewmember (14D), AVENGER Crewmember (USAR/NG only) (14S), Space and Missile Defense Operations (14X), Multiple Launch Rocket System (MLRS) Operations/Fire Direction Specialist (13P), Multiple Launch Rocket System (MLRS) Crewmember (13M), Cannon Crewmember (13B), Field Artillery Senior Sergeant (13Z), Man Portable Air Defense System Crewmember (RC) (14M), Air Defense (AD) Enhanced Early Warning System Operator (14H), Air Defense Command, Control, Communications, Computers and Intelligence Tactical Operations Center Enhanced Operator/Maintainer (14J), PATRIOT Fire Control Enhanced Operator/Maintainer (14E), Air and Missile Defense (AMD) Crewmember (14P), PATRIOT Launching Station Enhanced Operator/Maintainer (14T)"
        },
        {
          id: "106",
          label: "Small Boat Operators",
          details: "Watercraft Operator (88K)"
        },
        {
          id: "108",
          label: "Unmanned Vehicle System (UVS) Operators, General",
          details:
            "Unmanned Aerial Vehicle Operator (96U), Unmanned Aerial Vehicle (UAV) Operator (35K), Unmanned Aircraft Systems (UAS Operator) (15W)"
        },
        {
          id: "110",
          label: "Navigation, Communication, and Countermeasure, N.E.C.",
          details:
            "Radar Repairer (94M), Air Traffic Control Equipment Repairer (35D), Military Intelligence (MI) Systems Maintainer/Integrator (35T), Avionic Communications Equipment Repairer (35L), Satellite/Microwave Systems Chief (25T), Senior Electronic Maintenance Supervisor (94Z), Multichannel Transmission Systems Operator-Maintainer (25Q), Senior Electronics Maintenance Chief (35Z), Satellite Communications Systems Operator-Maintainer (25S), Electronic Maintenance Chief (35W), Air Traffic Control Equipment Repairer (94D), Military Intelligence Systems Maintainer/Integrator (33W), Signal Support Systems Specialist (25U), Radio and Communications Security (COMSEC) Repairer (35E), Avionic Mechanic (68N), Avionic Systems Repairer (35R), Aircraft Armament/Missile Systems Repairer (RC) (68J), Satellite/Microwave Systems Chief (31T), Avionic and Survivability Equipment Repairer (94R), Radio Equipment Repairer (94E), Avionic Communications Equipment Repairer (94L), Microwave Systems Operator-Maintainer (25P), Microwave Systems Operator-Maintainer (31P), Radar Repairer (35M), Signal Support Systems Specialist (31U), Multichannel Transmission Systems Operator-Maintainer (31R), Avionic Mechanic (15N), Satellite Communications Systems Operator-Maintainer (31S), Electronic Maintenance Supervisor (94W), Surveillance Radar Repairer (35C)"
        },
        {
          id: "111",
          label: "Shipboard and Other Fire Control",
          details: "Fire Control Repairer (91G), Fire Control Repairer (45G)"
        },
        {
          id: "112",
          label: "Missile Guidance and Control",
          details:
            "Multiple Launch Rocket System (MLRS) Repairer (27M), Land Combat Electronic Missile System Repairer (27E), PATRIOT System Repairer (27X), Land Combat Electronics Missile System Repairer (35A), Senior Missile Systems Maintainer (94X), Short Range Air Defense System Repairer (94T), Missile Systems Maintenance Chief (27Z), PATRIOT System Repairer (35S), Land Combat Support Systems (LCSS) Test Specialist (35B), Electronic and Missile Systems Maintenance Chief (94V), CHAPARRAL/REDEYE Repairer (27G), Multiple Launch Rocket System (MLRS) Repairer (94P), Electronic and Missile Systems Maintenance Chief (35V), Multiple Launch Rocket System (MLRS) Repairer (35P), Land Combat Electronic Missile System Repairer (94A), PATRIOT System Repairer (94S), AVENGER System Repairer (27T), AVENGER System Repairer (35T)"
        },
        {
          id: "115",
          label: "ADP Computers, General",
          details:
            "Telecommunications Computer Operator-Maintainer (74G), AN/TSQ-73 Air Defense Artillery Command and Control System Operator/Maintainer (14L)"
        },
        {
          id: "116",
          label: "Teletype and Cryptographic Equipment, General",
          details: "Computer/Automation Systems Repairer (35J)"
        },
        {
          id: "119",
          label: "Electronic Instruments, N.E.C.",
          details:
            "APACHE Attack Helicopter Systems Repairer (35K), Test, Measurement, and Diagnostic Equipment (TMDE) Maintenance Support Specialist (94H), Automatic Test Systems Operator/Maintainer (94Y), Integrated Family of Test Equipment Operator/Maintainer (35Y), Automatic Test Equipment Operator/Maintainer (39B), APACHE Attack Helicopter Systems Repairer (94K), Special Electronic Devices Repairer (35F), TMDE Maintenance Support Specialist (35H), Computer/Detection Systems Repairer (94F)"
        },
        {
          id: "120",
          label: "Radio Operators",
          details:
            "Electromagnetic Spectrum Manager (25E), Radio Operator-Maintainer (25C), Radio Operator-Maintainer (31C)"
        },
        {
          id: "122",
          label: "Air Traffic Control",
          details:
            "Field Artillery (FA) Firefinder Radar Operator (13R), Air Traffic Control Operator (93C), Air Traffic Control (ATC) Operator (15Q)"
        },
        {
          id: "123",
          label: "Intercept Operators (Code and Non-Code)",
          details:
            "Signals Collector/Analyst (35S), Signals Intelligence (SIGINT) Senior Sergeant/SIGINT Chief (35Z), Electronic Intelligence Interceptor/Analyst (98J), Multi-Sensor Operator (98P), Cryptologic Network Warfare Specialist (35Q), Cryptologic Communications Interceptor/Locator (98G), Common Ground Station Operator (96H), Electronic Warfare Specialist (29E), Signals Intelligence (Electronic Warfare) Senior Sergeant/Chief (98Z), Electronic Warfare Specialist (17E), Signals Intelligence (SIGINT) Voice Interceptor (35P), Communications Interceptor/Locator (98H), Signals Intelligence Analyst (35N), Common Ground Station (CGS) Analyst (35H), Signals Collector/Analyst (98Y), Signals Collection/Identification Analyst (98K), Signals Intelligence Analyst (98C), Multi Sensor Operator (35U), Chief Signals Intelligence (SIGINT) Sergeant (35V)"
        },
        {
          id: "124",
          label: "Operational Intelligence",
          details:
            "Imagery Analyst (96D), Chief Counterintelligence/Human Intelligence Sergeant (35Y), Ground Surveillance Systems Operator (96R), Intelligence Analyst (35F), Psychological Operations Specialist (37F), Translator/Interpreter (RC) (97L), Counterintelligence/Human Intelligence, Senior Sergeant (97Z), Interpreter/Translator (09L), Intelligence Analyst (96B), Counterintelligence Agent (97B), Counter Intelligence Agent (35L), Human Intelligence Collector (97E), Intelligence Senior Sergeant/Chief Intelligence Sergeant (35X), Human Intelligence Collector (35M), Geospatial Intelligence Imagery Analyst (35G), Intelligence Senior Sergeant (96Z)"
        },
        {
          id: "125",
          label: "Combat Operations Control, General",
          details:
            "Cavalry Scout (19D), Fire Control Specialist (13J), Tactical Automated Fire Control Systems Specialist (13C), Cannon Fire Direction Specialist (13E), Field Artillery Automated Tactical Data System Specialist (13D), Joint Fire Support Specialist (13F)"
        },
        {
          id: "126",
          label: "Communications Center Operations, General",
          details:
            "Chief Signal NCO (25X), Network Switching Systems Operator-Maintainer (31F), Network Switching Systems Operator-Maintainer (25F), Nodal Network Systems Operator-Maintainer (25N), Senior Signal Sergeant (31Z), Telecommunications Operations Chief (31W), Telecommunications Operator-Maintainer (25D), Telecommunications Operations Chief (25W), Telecommunications Operator-Maintainer (74C)"
        },
        {
          id: "127",
          label: "Cyberspace Operations, General",
          details:
            "Cyber Network Defender (25D), Cyber Operations Specialist (17C)"
        },
        {
          id: "130",
          label: "Medical Care and Treatment, General",
          details:
            "Mental Health Specialist (91X), Physical Therapy Specialist (68F), Respiratory Specialist (91V), Combat Medic Specialist (68W), Practical Nursing Specialist (68C), Health Care Specialist (91W), Cardiovascular Specialist (68N), Respiratory Specialist (68V), Operating Room Specialist (91D), Occupational Therapy Specialist (68L), Chief Medical NCO (91Z), Behavioral Health Specialist (68X), Orthopedic Specialist (68B), Practical Nurse (91C), Operating Room Specialist (68D), Ear, Nose, and Throat (ENT) Specialist (68U), Chief Medical NCO (68Z)"
        },
        {
          id: "131",
          label: "Radiology",
          details:
            "Pharmacy Specialist (91Q), Medical Laboratory Specialist (68K), Medical Specialist (91B), Radiology Specialist (68P), Pharmacy Specialist (68Q), Radiology Specialist (91P), Medical Laboratory Specialist (91K)"
        },
        {
          id: "132",
          label: "Diet Therapy",
          details:
            "Medical Equipment Repairer (91A), Veterinary Food Inspection Specialist (91R), Preventive Medicine Specialist (68S), Animal Care Specialist (91T), Preventive Medicine Specialist (91S), Nutrition Care Specialist (68M), Optical Laboratory Specialist (68H), Nutrition Care Specialist (91M), Animal Care Specialist (68T), Optical Laboratory Specialist (91H), Veterinary Food Inspection Specialist (68R), Biomedical Equipment Specialist (68A), Eye Specialist (68Y), Optical Laboratory Specialist (42E)"
        },
        {
          id: "133",
          label: "Dental Care, General",
          details: "Dental Specialist (68E), Dental Specialist (91E)"
        },
        {
          id: "134",
          label: "Medical Administration",
          details:
            "Patient Administration Specialist (71G), Patient Administration Specialist (91G), Patient Administration Specialist (68G), Medical Logistics Specialist (91J), Medical Supply Specialist (76J), Medical Logistics Specialist (68J)"
        },
        {
          id: "140",
          label: "Photography, General",
          details:
            "Visual Information Equipment Operator-Maintainer (25R), Multimedia Illustrator (25M), Visual Information Operations Chief (25Z), Combat Documentation/Production Specialist (25V)"
        },
        {
          id: "141",
          label: "Surveying",
          details:
            "Technical Engineer (21T), Geospatial Engineer (21Y), Field Artillery Surveyor (82C), Technical Engineering Specialist (51T), Topographic Analyst (21U), Topographic Surveyor (21S), Topographic Engineering Supervisor (81Z), Field Artillery Surveyor (13S), Topographic Analyst (81T), Topographic Surveyor (82D), Geospatial Engineer (12Y), Field Artillery Surveyor/Meteorological Crewmember (13T), Technical Engineer (12T)"
        },
        {
          id: "142",
          label: "Weather, General",
          details:
            "Field Artillery Meteorological Crewmember (93F), Field Artillery Meteorological Crewmember (13W)"
        },
        {
          id: "143",
          label: "EOD/UDT",
          details:
            "Explosive Ordnance Disposal Specialist (55D), Diver (12D), Diver (21D), Diver (00B), Explosive Ordnance Disposal Specialist (89D)"
        },
        {
          id: "145",
          label: "Musicians, General",
          details:
            "Oboe Player (02H), Euphonium Player (02C), Trombone Player (02E), Bands Senior Sergeant (02Z), Special Bands Member (02S), French Horn Player (02D), Electric Bass Player (02U), Army Bandperson (02A), Guitar Player (02T), Keyboard Player (02N), Saxophone Player (02L), Clarinet Player (02J), Cornet or Trumpet Player (02B), Special Band Musician (42S), Tuba Player (02F), Bassoon Player (02K), Musician (42R), Percussion Player (02M), Flute or Piccolo Player (02G)"
        },
        {
          id: "149",
          label: "Firefighting and Damage Control",
          details:
            "Fire Fighter (51M), Chemical Operations Specialist (54B), Mortuary Affairs Specialist (92M), Petroleum Laboratory Specialist (92L), Petroleum Laboratory Specialist (77L), Firefighter (21M), Firefighter (12M), Chemical, Biological, Radiological, and Nuclear (CBRN) Specialist (74D)"
        },
        {
          id: "150",
          label: "Recruiting and Counseling",
          details:
            "Human Resources Information Systems Management Specialist (42F), Recruiter (79R), Army Reserve Career Counselor (Army Reserve) (79V), Personnel Information Systems Management Specialist (75F), Personnel Administration Specialist (75B), Career Counselor (79S), Personnel Services Specialist (75H), Recruiting and Retention NCO (Army National Guard of the United States) (79T)"
        },
        {
          id: "151",
          label: "Legal",
          details:
            "Administrative Specialist (42L), Paralegal Specialist (27D), Administrative Specialist (71L), Legal Specialist (71D)"
        },
        {
          id: "152",
          label: "Combined Personnel and Administration, General",
          details:
            "Command Sergeant Major (CSM) Force Sustainment (00P), Sergeant Major (SGM) MOS Immaterial (00E), Command Sergeant Major (CSM) MOS Immaterial (00X), Nominative Command Sergeant Major/Sergeant Major (00Z), Command Sergeant Major (CSM) Logistics (00L), Command Sergeant Major (CSM) Maneuver Support(MS)/Logistics (00K), Human Resources Specialist (42A), Command Sergeant Major (CSM) Infantry/Armor/Field Artillery/Combat Engineer Immaterial (00T), Command Sergeant Major (CSM) Engineer/Signal/Military Police/Military Intelligence Immaterial (00J), Command Sergeant Major (CSM) Infantry/Armor Immaterial (00R)"
        },
        {
          id: "153",
          label: "Operators/Analysts/Programmers",
          details:
            "Information Systems Operator-Analyst (74B), Information Systems Chief (25Y), Information Systems Chief (74Z), Information Technology Specialist (25B)"
        },
        {
          id: "154",
          label: "Disbursing",
          details:
            "Finance Senior Sergeant (73Z), Accounting Specialist (73D), Finance Specialist (73C), Financial Management Technician (44C), Financial Management Technician (36B)"
        },
        {
          id: "155",
          label: "Supply Administration",
          details:
            "Transportation Management Coordinator (88N), Automated Logistical Specialist (92A), Aviation Operations Specialist (15P), Unit Supply Specialist (92Y), Aviation Operations Specialist (93P), Senior Noncommissioned Logistician (92Z), Contracting Noncommissioned Officer (NCO) (51C)"
        },
        {
          id: "156",
          label: "Chaplain's Assistants",
          details:
            "Chaplain Assistant (71M), Religious Affairs Specialist (56M)"
        },
        {
          id: "157",
          label: "Information and Education, General",
          details:
            "Public Affairs Mass Communication Specialist (46S), Public Affairs Broadcast Specialist (46R), Chief Public Affairs NCO (46Z), Civil Affairs Specialist (38B), Civil Affairs Specialist (RC) (38A), Public Affairs Specialist (46Q)"
        },
        {
          id: "160",
          label: "Aircraft, General",
          details:
            "Observation/Scout Helicopter Repairer (RC) (15V), OH-58D/Armament/Electrical/Avionics Systems Repairer (15J), Aircraft Structural Repairer (68G), Aircraft Electrician (15F), Aircraft Structural Repairer (15G), Aircraft Powerplant Repairer (68B), Utility Airplane Repairer (RC) (67G), UH-1 Helicopter Repairer (67N), OH-58D Scout Helicopter Repairer (67S), UH-60 Helicopter Repairer (67T), UH-60 Helicopter Repairer (15T), OH-58D Armament/Electrical/Avionics Systems Repairer (68S), Aircraft Maintenance Senior Sergeant (67Z), Aircraft Powertrain Repairer (15D), AH-1 Attack Helicopter Repairer (RC) (67Y), OH-58D Helicopter Repairer (15S), CH-47 Helicopter Repairer (67U), Observation/Scout Helicopter Repairer (67V), AH-64 Attack Helicopter Repairer (15R), Aviation Senior Sergeant (15Z), Unmanned Aircraft Systems Repairer (15E), Aircraft Pneudraulics Repairer (15H), Aircraft Pneudraulics Repairer (68H), Aircraft Powertrain Repairer (68D), UH-1 Helicopter Repairer (RC) (15M), CH-47 Helicopter Repairer (15U), Aircraft Components Repair Supervisor (15K), Aircraft Electrician (68F), Aircraft Powerplant Repairer (15B), Aircraft Components Repair Supervisor (68K), AH-64 Attack Helicopter Repairer (67R)"
        },
        {
          id: "161",
          label: "Automotive, General",
          details:
            "Track Vehicle Mechanic (63Y), Maintenance Supervisor (63X), Construction Equipment Repairer (91L), M1 Abrams Tank System Maintainer (91A), Construction Equipment Repairer (62B), Fuel & Electrical System Repairer (63G), Artillery Mechanic (63D), M60A1/A3 Tank System Mechanic (63N), BRADLEY Fighting Vehicle System Mechanic (63T), Mechanical Maintenance Supervisor (63Z), Tracked Vehicle Repairer (91H), Self Propelled Artillery Systems Maintainer (91P), BRADLEY Fighting Vehicle System Maintainer (63M), Wheeled Vehicle Repairer (91B), STRYKER Systems Maintainer (91S), Maintenance Supervisor (91X), Special Purpose Equipment Repairer (52X), Track Vehicle Repairer (63H), Wheel Vehicle Repairer (63W), M1 ABRAMS Tank System Maintainer (63A), Wheeled Vehicle Mechanic (63B), BRADLEY Fighting Vehicle System Maintainer (91M), M1 ABRAMS Tank System Mechanic (63E), Heavy Wheel Vehicle Mechanic (63S), Senior Maintenance Supervisor (91Z)"
        },
        {
          id: "162",
          label: "Lineman/Central Office",
          details:
            "Wire Systems Equipment Repairer (35N), Cable Systems Installer-Maintainer (31L), Cable Systems Installer-Maintainer (25L)"
        },
        {
          id: "164",
          label: "Aviation Ordinance",
          details:
            "AH-64D Armament/Electrical/Avionics Systems Repairer (15Y), Ammunition Specialist (55B), Armament Repairer (45K), Ammunition Specialist (89B), M60A1/A3 Tank Turret Mechanic (RC) (45N), AH-64A Armament/Electrical Systems Repairer (68X), Self-Propelled Field Artillery Turret Mechanic (45D), Armament Repairer (91K), M1 ABRAMS Tank Turret Mechanic (45E), Small Arms/Towed Artillery Repairer (91F), AH-64D Armament/Electrical/Avionics Systems Repairer (68Y), AH-64A Armament/Electrical/Avionics Systems Repairer (15X), Small Arms/Artillery Repairer (45B), Ammunition Stock Control and Accounting Specialist (89A), BRADLEY Fighting Vehicle System Turret Mechanic (45T)"
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
            "Tactical Power Generation Specialist (91D), Power-Generation Equipment Repairer (52D), Prime Power Production Specialist (12P), Prime Power Production Specialist (52E), Prime Power Production Specialist (21P)"
        },
        {
          id: "169",
          label: "Other Mechanical and Electrical Equipment, General",
          details:
            "Quartermaster and Chemical Equipment Repairer (91J), Railway Equipment Repairer (RC) (88P), Quartermaster and Chemical Equipment Repairer (63J)"
        },
        {
          id: "170",
          label: "Metal Body Repair",
          details:
            "Allied Trades Specialist (91E), Machinist (44E), Metal Worker (91W), Metal Worker (44B)"
        },
        {
          id: "171",
          label: "Construction Equipment Operation",
          details:
            "Construction Equipment Supervisor (62N), General Engineering Supervisor (21X), Concrete & Asphalt Equipment Operator (62H), Concrete and Asphalt Equipment Operator (12V), Construction Equipment Operator (21E), Quarrying Specialist (RC) (21G), Construction Equipment Supervisor (21N), Carpentry and Masonry Specialist (21W), Construction Engineering Supervisor (51H), Heavy Construction Equipment Operator (62E), Crane Operator (62F), Quarrying Specialist (RC) (62G), General Engineering Supervisor (12X), Construction Engineering Supervisor (12H), Horizontal Construction Engineer (12N), Crane Operator (21F), Carpentry and Masonry Specialist (12W), General Construction Equipment Operator (21J), General Engineering Supervisor (51Z), Concrete and Asphalt Equipment Operator (21V), Quarrying Specialist (RC) (12G), Construction Engineering Supervisor (21H), General Construction Equipment Operator (62J), Carpentry & Masonry Specialist (51B)"
        },
        {
          id: "172",
          label: "Utilities, General",
          details:
            "Plumber (51K), Powerline Distribution Specialist (RC) (21Q), Interior Electrician (51R), Plumber (12K), Powerline Distribution Specialist (RC) (12Q), Plumber (21K), Utilities Equipment Repairer (52C), Utilities Equipment Repairer (91C), Transmission & Distribution Specialist (RC) (52G), Water Treatment Specialist (92W), Interior Electrician (12R), Water Treatment Specialist (77W), Interior Electrician (21R)"
        },
        {
          id: "174",
          label: "Lithography, General",
          details: "Lithographer (81L), Lithographer (21L)"
        },
        {
          id: "176",
          label: "Fabric, Leather, and Rubber, General",
          details: "Fabric Repair Specialist (43M)"
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
            "Motor Transport Operator (88M), Transportation Senior Sergeant (88Z), Railway Senior Sergeant (RC) (88X), Railway Specialist (USAR only) (88U)"
        },
        {
          id: "182",
          label: "Missile Fuel and Petroleum",
          details:
            "Petroleum Supply Specialist (92F), Cargo Specialist (88H), Petroleum Supply Specialist (77F)"
        },
        {
          id: "183",
          label: "Law Enforcement, General",
          details:
            "Military Police (31B), Internment/Resettlement Specialist (95C), Military Working Dog (MWD) Handler (31K), CID Special Agent (95D), Senior Military Police Sergeant (31Z), Military Police (95B), CID Special Agent (31D), Corrections and Detention Specialist (31E)"
        },
        {
          id: "184",
          label: "Laundry and Personal Service, General",
          details:
            "Shower and Laundry Specialist (92S), Laundry & Bath Specialist (57E)"
        },
        {
          id: "186",
          label: "Forward Area Equipment Support, General",
          details:
            "Parachute Rigger (92R), Aviation Life Support Systems Repairer (15A)"
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
