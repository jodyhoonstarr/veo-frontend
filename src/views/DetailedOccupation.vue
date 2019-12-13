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
      selectedOccupations: [],
      selectedCohort: [],
      occupations: [
        {
          id: "101",
          label: "Infantry, General / Special Forces",
          details:
            "Infantryman (11B), Special Forces Engineer Sergeant (18C), Infantry Senior Sergeant (11L), Heavy Antiarmor Weapons Infantryman (11H), Indirect Fire Infantryman (11C), Infantry Senior Sergeant (11Z), Special Forces Weapons Sergeant (18B), Special Forces Senior Sergeant (18Z), Special Forces Medical Sergeant (18D), Special Forces Communications Sergeant (18E), Special Forces Assistant Operations and Intelligence Sergeant (18F), Fighting Vehicle Infantryman (11M)"
        },
        {
          id: "143",
          label: "Divers / EOD / UDT",
          details:
            "Diver (00B), Explosive Ordnance Disposal Specialist (89D), Diver (21D), Diver (12D), Explosive Ordnance Disposal Specialist (55D)"
        },
        {
          id: "150",
          label: "Personnel, General / Recruiting and Counseling",
          details:
            "Recruiter/Retention NCO (00R), Equal Opportunity Specialist (00U), Personnel Information Systems Management Specialist (75F), Recruiter (79R), Personnel Services Specialist (75H), Recruiting and Retention NCO (Army National Guard of the United States) (79T), Personnel Records Specialist (75D), Career Counselor (79S), Recruiter (00E), Personnel Management Specialist (75C), Army Reserve Career Counselor (Army Reserve) (79V), Personnel Administration Specialist (75B), Personnel Psychology Specialist (01K), Human Resources Information Systems Management Specialist (42F), Personnel Sergeant (75Z), Personnel Actions Specialist (75E), Reenlistment NCO (79D)"
        },
        {
          id: "102",
          label: "Armor and Amphibious, General",
          details:
            "XM1 Tank Driver (19L), Armor Crewman (11E), Armor Reconnaissance Vehicle Crewman (19G), M60A2 Armor Crewman (19J), Armor Senior Sergeant (19Z), M1 Armor Crewman (19K), Armor Reconnaissance Vehicle Driver (19H), M48/M60 Tank Driver (19F), M48-M60 Armor Crewman (19E)"
        },
        {
          id: "149",
          label:
            "Firefighting and damage Control / Memorial Activities and Embalming / Nuclear, Biological, and Chemical Warfare Specialists / Other Technical Specialists and Assistants / Physical Science Laboratory",
          details:
            "Materials Quality Specialist (51G), NBC Specialist (54E), Firefighter (21M), Chemical Operations Specialist (54B), Chemical Senior Sergeant (54Z), Firefighter (12M), Mortuary Affairs Specialist (57F), Mechanical Engineering Assistant (01C), Electrical-Electronic Engineering Assistant (01B), Civil Engineering Assistant (01D), Chemical Laboratory Specialist (92D), Chemical Engineering Assistant (01G), Chemical, Biological, Radiological, and Nuclear (CBRN) Specialist (74D), Fire Fighter (51M), Mortuary Affairs Specialist (92M), Petroleum Laboratory Specialist (92C), Petroleum Laboratory Specialist (92L), Mathematics-Statistics Assistant (01E), Petroleum Laboratory Specialist (77L), Physical Sciences Assistant (01F)"
        },
        {
          id: "145",
          label: "Musicians, General",
          details:
            "Flute or Piccolo Player (02G), Brass Group Leader (02P), Special Bands Member (02S), Oboe Player (02H), Trombone Player (02E), Cornet or Trumpet Player (02B), Special Band Musician (42S), Percussion Player (02M), Percussion Group Leader (02R), Keyboard Player (02N), Guitar Player (02T), Saxophone Player (02L), Euphonium Player (02C), Woodwind Group Leader (02Q), Army Bandperson (02A), Electric Bass Player (02U), Bands Senior Sergeant (02Z), Clarinet Player (02J), Tuba Player (02F), French Horn Player (02D), Bassoon Player (02K), Musician (42R)"
        },
        {
          id: "103",
          label: "Combat Engineering, General",
          details:
            "Atomic Demolition Munitions Specialist (12E), Combat Engineering Senior Sergeant (12Z), Chemical Operations Assistant (54A), Combat Engineer (12B), Pioneer (12A), Combat Engineering Senior Sergeant (21Z), Bridge Crewmember (12C), Combat Engineer (21B), Engineer Tracked Vehicle Crewman (12F), Powered Bridge Specialist (12D), Field Illumination Crewman (17E), Smoke Operations Specialist (54C), Bridge Crewmember (21C)"
        },
        {
          id: "104",
          label:
            "Artillery and Gunnery / Missile Artillery, Operating Crew / Rocket Artillery",
          details:
            "BRADLEY LINEBACKER Crewmember (14R), HONEST JOHN Rocket Crew Member (15F), Air Defense Artillery Senior Sergeant (14Z), LANCE Crewmember (13N), AVENGER Crewmember (USAR/NG only) (14S), HERCULES Missile Crew Member (16B), Space and Missile Defense Operations (14X), Air Defense Artillery Senior Sergeant (16Z), Air Defense Command, Control, Communications, Computers and Intelligence Tactical Operations Center Enhanced Operator/Maintainer (14J), Field Artillery Missile-Rocket Senior Sergeant (15Z), HERCULES Fire Control Crewman (16C), VULCAN Crewmember (16R), PATRIOT Launching Station Enhanced Operator/Maintainer (14T), HAWK Missile System Crewmember (14D), HAWK Fire Control Crewmember (16E), HAWK Missile Crewmember (16D), Light Air Defense Artillery Crewmember (Reserve Forces) (16F), Multiple Launch Rocket System (MLRS) Operations/Fire Direction Specialist (13P), SGT YORK Air Defense Gun Crewmember (16L), MLRS/LANCE Operational/Fire Direction Specialist (15J), SERGEANT Missile Crewman (15B), Air Defense (AD) Battle Management System Operator (14G), Field Artillery Basic (13A), LANCE Crewmember/MLRS Sergeant (15D), PATRIOT Missile Crewmember (16T), Air and Missile Defense (AMD) Crewmember (14P), Cannon Crewmember (13B), PATRIOT Fire Control Enhanced Operator/Maintainer (14E), Air Defense (AD) Enhanced Early Warning System Operator (14H), Multiple Launch Rocket System (MLRS) Crewmember (13M), Field Artillery Senior Sergeant (13Z), Man Portable Air Defense Systems (MANPADS) Crewmember (16S), CHAPARRAL Crewmember (16P), Man Portable Air Defense System Crewmember (RC) (14M), PERSHING Missile Crewmember (15E), Cannon/Missile Senior Sergeant (13Y), ROLAND Systems Crewmember (Reserve Forces) (16G)"
        },
        {
          id: "106",
          label: "Small Boat Operators",
          details:
            "Amphibian Operator (61D), Seaman (61A), Watercraft Operator (61B), Marine Senior Sergeant (61Z), Marine Senior Sergeant (88Y), Watercraft Operator (88K)"
        },
        {
          id: "108",
          label: "Unmanned Vehicle System (UVS) Operators, General",
          details:
            "Unmanned Aerial Vehicle (UAV) Operator (35K), Unmanned Aerial Vehicle Operator (96U), Unmanned Aircraft Systems (UAS Operator) (15W)"
        },
        {
          id: "110",
          label:
            "Air Traffic Control Radar / Communications Radio / Navigation, Communication, and Countermeasure, N.E.C. / Surveillance/Target Acquisition and Tracking Radar",
          details:
            "HAWK Field Maintenance Equipment/Pulse Acquisition Radar Repairer (27J), EW/Intercept Aerial Sensor Repairer (33V), Communications Equipment Maintenance Chief (29X), Satellite/Microwave Communications Chief (29T), Weapons Support Radar Repairer (26B), Communications-Electronics Maintenance Chief (32Z), Avionic Flight Systems Repairer (35Q), HAWK Continuous Wave Radar Repairer (24K), Ground Control Approach Radar Repairer (26D), Aerial Surveillance Radar Repairer (RC) (26M), Electronic Equipment Maintenance Chief (39X), HAWK Continuous Wave Radar Repairman (23T), Military Intelligence (MI) Systems Maintainer/Integrator (35T), HAWK Pulse Radar Repairer (23S), Multichannel Transmission Systems Operator-Maintainer (25Q), Air Defense Radar Repairer (RC) (26H), Avionic and Survivability Equipment Repairer (94R), Target Acquisition Surveillance Radar Repairer (39C), EW/Intercept Strategic Receiving Subsystems/Repairer (33P), Avionic Equipment Maintenance Supervisor (35P), Avionic Flight Systems Repairer (68Q), Satellite Communications Systems Operator-Maintainer (31S), HAWK Fire Control/Continuous Wave Radar Repairer (27K), NIKE Maintenance Chief (23W), HAWK Pulse Radar Repairer (24J), Tactical Microwave Systems Repairer (26L), Radar Special Electronic Devices Maintenance Chief (39W), Intercept Recording Systems Repairman (33D), Satellite Communications Systems Operator-Maintainer (25S), Terminal Intercept Equipment Repairman (33C), Communications Systems Circuit Control Supervisor (31X), Fixed Plant Carrier Repairman (32E), EW/Intercept Strategic System Analyst and Command and Control Subsystem Repairer (33M), Aircraft Armament/Missile Systems Repairer (RC) (68J), Microwave Systems Operator/Repairer (29V), Air Traffic Control Equipment Repairer (94D), Electronic Warfare/Intercept Aviation Systems Repairer (33R), Avionic Flight Control Equipment Repairman (35N), Target Acquisition Surveillance Radar Repairer (26C), Electronics Maintenance Chief (29Z), Electronic Maintenance Chief (35W), EW/Intercept Strategic Processing & Storage Subsystems Repairer (33Q), Microwave Systems Operator-Maintainer (25P), Intercept Demultiplex Systems Repairman (33F), Avionic Mechanic (68N), NIKE High Power Radar-Simulator Repairer (23U), Radio and Communications Security (COMSEC) Repairer (35E), Defense Acquisition Radar Mechanic (24P), Radar Repairer (35M), Field Communications-Electronics Equipment Mechanic (31B), Radar Maintenance Supervisor-Inspector (26W), Electronics Maintenance Supervisor (29W), Surveillance Radar Repairer (35C), Air Traffic Control Equipment Repairer (35D), Radio Equipment Repairer (94E), Avionic Communications Equipment Repairer (94L), Avionic Mechanic (35K), Aerial Surveillance Infrared Repairer (RC) (26N), Tactical Satellite/Microwave Repairer (29M), HAWK Continuous Wave Radar Mechanic (24B), Unattended Ground Sensor Systems Repairman (26U), Avionic Communications Equipment Repairer (35L), Communications Systems Circuit Controller (32D), Fixed Station Radio Repairer (32H), Aerial Radar Sensor Repairer (26E), Avionic Communications Equipment Repairer (68L), Radio Repairer (29E), NIKE Track Radar Repairer (23N), Military Intelligence Systems Maintainer/Integrator (33W), Radar Repairer (94M), SATCOM Systems Repairer (29Y), Aerial Electronic Warning Defense Equipment Repairer (26K), Microwave Systems Operator-Maintainer (31P), Avionic Mechanic (15N), Signal Support Systems Specialist (25U), Strategic Microwave Systems Repairer (26V), Satellite/Microwave Systems Chief (31T), ECM/DF Systems Repairman (33G), EW/Intercept Systems Maintenance Supervisor (33Z), Strategic Systems Repairer (33Y), Signal Support Systems Specialist (31U), UL Communications Maintainer (31V), Avionic Radar Repairer (68R), Air Traffic Controller (ATC) Equipment Repairer (93D), Senior Electronic Maintenance Supervisor (94Z), Tactical Communications Chief (31G), Senior Electronics Maintenance Chief (35Z), SATCOM Equipment Repairer (26Y), Multichannel Transmission Systems Operator-Maintainer (31R), EW/Intercept Tactical System Repairer (33S), Electronic Maintenance Supervisor (94W), Satellite/Microwave Systems Chief (25T), Field Radio Repairer (31E), Avionic Systems Repairer (35R), Forward Area Alerting Radar (FAAR) Repairer (27N), Electronic Warfare/Intercept Tactical Systems Repairer (33T)"
        },
        {
          id: "156",
          label: "Chaplain's Assistants / Recreation and Welfare",
          details:
            "Performing Arts Specialist (03B), Arts & Crafts Specialist (03D), Chaplain Assistant (71M), Special Services Senior Sergeant (03Z), Religious Affairs Specialist (56M), Physical Activities Specialist (03C)"
        },
        {
          id: "120",
          label: "Non-Code Radio / Radio Code",
          details:
            "Strategic Microwave Systems Operator (26R), Radio Operator-Maintainer (31C), Radio Teletype Operator (05C), Tactical Satellite Microwave Systems Operator (31Q), Radio Operator-Maintainer (25C), Radio Teletypewriter Operator (Non-Morse) (05F), Radio Operator (05B), Electromagnetic Spectrum Manager (25E), Voice-Radio Operator (05E), Multichannel Transmission Systems Operator (31M), Tactical Satellite/Microwave Systems Operator (26Q), Combat Signaler (31K)"
        },
        {
          id: "123",
          label:
            "Analysis / Electronic Countermeasures / Intercept Operators (Code and Non-Code) / Signal Intelligence/Electronic Warfare, General",
          details:
            "Cryptologic Network Warfare Specialist (35Q), Communications Interceptor/Locator (98H), EW/SIGINT Morse Interceptor (05H), EW/SIGINT Non-Morse Interceptor (05K), Signals Collection/Identification Analyst (98K), Electronic Warfare Specialist (29E), Signals Intelligence (SIGINT) Senior Sergeant/SIGINT Chief (35Z), Signals Intelligence Analyst (98C), Aerial Sensor Specialist (RC) (17L), Common Ground Station (CGS) Analyst (35H), EW/Cryptanalytic Cryptanalyst (98B), Signals Collector/Analyst (35S), Signal Security Specialist (05G), Multi-Discipline Counter-Intelligence Operator/Analyst (97G), EW/SIGINT Emitter Identifier/Locator (05D), Signals Intelligence (SIGINT) Voice Interceptor (35P), Emitter Locator/Identifier (98D), Signals Collector/Analyst (98Y), Signals Intelligence Analyst (35N), Electronic Intelligence Interceptor/Analyst (98J), Multi-Sensor Operator (98P), Multi Sensor Operator (35U), Electronic Warfare Specialist (17E), Signals Intelligence (Electronic Warfare) Senior Sergeant/Chief (98Z), Common Ground Station Operator (96H), Chief Signals Intelligence (SIGINT) Sergeant (35V), Cryptologic Communications Interceptor/Locator (98G)"
        },
        {
          id: "125",
          label: "Combat Operations Control, General",
          details:
            "Joint Fire Support Specialist (13F), Aeroscout Observer (93B), Field Artillery Target Acquisition Senior Sergeant (13W), Cavalry Scout (19D), Field Artillery Automated Tactical Data System Specialist (13D), Fire Control Specialist (13J), Remotely Piloted Vehicle Crewmember (13T), Cannon Fire Direction Specialist (13E), Field Artillery Target Acquisition Specialist (17C), Air Defense Artillery Operations & Intelligence Assistant (16H), Armor Reconnaissance Specialist (11D), Tactical Automated Fire Control Systems Specialist (13C)"
        },
        {
          id: "111",
          label: "Airborne Fire Control / Shipboard and Other Fire Control",
          details:
            "FA Computer Repairer (34Y), Aircraft Fire Control Repairman (35J), Fire Control Repairer (45G), Fire Control Repairer (91G), Field Artillery Tactical Fire Direction Systems Repairer (39Y), Field Artillery Digital Systems Repairer (34L), Fire Control Computer Repairer (34G)"
        },
        {
          id: "112",
          label:
            "Missile Checkout Equipment, Test Equipment, and Calibration / Missile Guidance and Control",
          details:
            "SERGEANT Test Equipment Repairman (21T), HAWK Fire Control Mechanic (RC) (24E), HAWK Maintenance Chief (24V), ROLAND FMTS Repairer (RC) (27D), Anti-Ballistic Missile Maintenance Specialist (28M), Multiple Launch Rocket System (MLRS) Repairer (35P), SERGEANT Firing Set Repairman (21R), ROLAND Repairer (RC) (27C), CORPORAL Fire Control Mechanic (23B), Electronic and Missile Systems Maintenance Chief (94V), NIKE-HERCULES Missile-Launcher Repairer (22N), SERGEANT Missile Guidance Repairman (21S), Short Range Air Defense System Repairer (94T), NIKE-HERCULES Fire Control Mechanic (24Q), SGT YORK Air Defense Gun Radar/Electrical Repairer (27P), HAWK Field Maintenance/Firing Section Repairer (27H), CHAPARRAL/REDEYE Repairer (27G), ROLAND System Mechanic (24S), Land Combat Support System Test Specialist (27B), AVENGER System Repairer (35T), HAWK Fire Control Repairer (23Q), HAWK Maintenance Chief (23V), PERSHING Electronics Repairer (21L), Electronic and Missile Systems Maintenance Chief (35V), PERSHING Electronics Materiel Specialist (21G), HAWK Missile Launcher Mechanic (24D), PATRIOT System Repairer (94S), SGT YORK Air Defense Gun Systems Mechanic (24W), SERGEANT Maintenance Chief (21U), VULCAN Repairer (27F), Improved HAWK Mechanical Systems Repairman (46D), Land Combat Support Systems (LCSS) Test Specialist (35B), Missile Systems Maintenance Chief (27Z), SGT YORK Air Defense Gun System Test Specialist (27Q), Multiple Launch Rocket System (MLRS) Repairer (94P), NIKE-HERCULES Custodial Mechanic (24U), AVENGER System Repairer (27T), HAWK Maintenance Chief (27V), HAWK Missile-Launcher Repairer (22K), Land Combat Electronic Missile System Repairer (27E), Multiple Launch Rocket System (MLRS) Repairer (27M), PATRIOT System Repairer (35S), NIKE Test Equipment Repairer (22L), HAWK Fire Control Repairer (24H), Land Combat Electronics Missile System Repairer (35A), PATRIOT System Repairer (27X), HAWK Fire Control Mechanic (24F), HAWK Launcher/Mechanical Systems Repairer (24L), Senior Missile Systems Maintainer (94X), Land Combat Electronic Missile System Repairer (94A), LANCE System Repairer (27L), HAWK Information Coordination Central Mechanic (24G)"
        },
        {
          id: "186",
          label: "Forward Area Equipment Support, General",
          details:
            "Aviation Life Support Systems Repairer (15A), Parachute Rigger (43E), Parachute Rigger (92R)"
        },
        {
          id: "164",
          label:
            "Ammunition Repair / Armament Maintenance, General / Artillery Repair / Aviation Ordnance / Nuclear Weapons Maintenance and Assembly / Small Arms Repair / Turret Repair",
          details:
            "Ammunition Specialist (89B), Nuclear Weapons Specialist (55G), Ammunition Stock Control and Accounting Specialist (89A), Aircraft Armament Repairman (45J), M60A1/A3 Tank Turret Mechanic (RC) (45N), Armament Repairer (91K), M1 ABRAMS Tank Turret Mechanic (45E), Artillery Repairer (45L), Small Arms/Towed Artillery Repairer (91F), Ammunition Helper (55A), Armament Repairer (45K), Armament Maintenance Apprentice (45A), AH-64D Armament/Electrical/Avionics Systems Repairer (15Y), SHERIDAN Turret Mechanic (45P), Self-Propelled Field Artillery Turret Mechanic (45D), Ammunition Specialist (55B), Armament/Fire Control Maintenance Supervisor (45Z), M60A2 Tank Turret Mechanic (45R), BRADLEY Fighting Vehicle System Turret Mechanic (45T), AH-64A Armament/Electrical Systems Repairer (68X), Ammunition Specialist (55C), AH-64A Armament/Electrical/Avionics Systems Repairer (15X), Ammunition Supervisor (55Z), Ammunition Inspector (55X), Small Arms/Artillery Repairer (45B), AH-64D Armament/Electrical/Avionics Systems Repairer (68Y), Aircraft Armament Subsystem Mechanic (45M)"
        },
        {
          id: "114",
          label: "Nuclear Weapons Equipment Repair, General",
          details: "Nuclear Weapons Electronics Specialist (35F)"
        },
        {
          id: "115",
          label: "ADP Computers, General",
          details:
            "Radar Data Processing Equipment Repairman (25H), Computerized System Maintenance Chief (39V), Automated Communications Computer Systems Repairer (39G), Tactical Computer Systems Repairer (34T), AN/TSQ-51 System Repairer/Maintenance Chief (25K), Telecommunications Computer Operator-Maintainer (74G), ADMSE Repairer (34H), ADPS Repairman (34D), Operations Central Repairer (25J), AN/TSQ-73 Air Defense Artillery Command and Control System Operator/Maintainer (14L), Card Punch Machine Repairer (34B), Decentralized Auto Support Systems (DAS3) Computer Repairer (34C), ADP Maintenance Supervisor (34Z), BIRDIE Repairman (25D), Mobile Air Defense Command Post Monitor Repairman (25G), Digital Equipment Maintenance Chief (29U), Univac 1004/1005 DCT 9000 System Repairer (34J), DAS3 Computer Systems Repairer (39D), ADMSE Repairer (29H), SDS 920 Equipment Repairman (34M), Tactical Computer System Repairer (39T), AN/TSQ-73 ADA Command & Control System Operator/Maintainer (25L), DSTE Repairer (34F), Field Artillery Digital Systems Repairer (39L), IBM 360 Repairer (34K), NCR 500 Computer Repairer (34E), Digital Communications Equipment Repairer (29G), IBM ADPS Repairer (39K)"
        },
        {
          id: "122",
          label: "Air Traffic Control / Radar",
          details:
            "Combat Surveillance & Target Acquisition Crewman (17A), Defense Acquisition Radar Operator (16J), Ground Surveillance Radar Crewman (17K), ATC Approach Control/Enroute Specialist (93K), Field Artillery (FA) Firefinder Radar Operator (13R), ATC Chief (93L), Air Traffic Control Tower Operator (93H), Air Traffic Control Operator (93C), Air Traffic Control (ATC) Operator (15Q), Remote Sensor Specialist (17M), Combat Surveillance & Target Acquisition NCO (17Z), Field Artillery Radar Crewmember (17B), Air Traffic Control Radar Controller (93J)"
        },
        {
          id: "116",
          label: "Teletype and Cryptographic Equipment, General",
          details:
            "Fixed COMSEC Equipment Repairer (29F), Fixed Cryptographic Equipment Repairer (32G), Teletypewriter Equipment Repairer (29J), Communications Security Equipment Repairer (29S), Computer/Automation Systems Repairer (35J), Teletypewriter (31J), COMSEC Maintenance Chief (29P), Fixed Ciphony Repairer (32F)"
        },
        {
          id: "171",
          label:
            "Construction Equipment Operation / Construction, General / Woodworking",
          details:
            "Pipeline Specialist (51F), Wheeled Tractor Operator (62L), Asphalt Equipment Operator (62D), Heavy Construction Equipment Operator (62E), Mason (51D), Construction Engineering Supervisor (51H), Rough Terrain Forklift & Loader Operator (62M), Quarrying Specialist (RC) (21G), General Construction Equipment Operator (21J), Carpentry and Masonry Specialist (12W), Concrete and Asphalt Equipment Operator (21V), Crane Operator (21F), Carpentry & Masonry Specialist (51B), General Engineering Supervisor (21X), Quarrying Specialist (RC) (62G), Horizontal Construction Engineer (12N), Structures Specialist (51C), Construction Equipment Supervisor (21N), Construction Equipment Operator (21E), Sawyer (57D), Grader Operator (62K), General Engineering Supervisor (12X), Quarrying Specialist (RC) (12G), General Construction Equipment Operator (62J), Crane Operator (62F), Construction Engineering Supervisor (21H), Concrete and Asphalt Equipment Operator (12V), Concrete & Asphalt Equipment Operator (62H), Construction & Utilities Worker (51A), Construction Equipment Supervisor (62N), Carpentry and Masonry Specialist (21W), General Engineering Supervisor (51Z), Construction Engineering Supervisor (12H)"
        },
        {
          id: "119",
          label: "Electronic Instruments, N.E.C. / Training Devices",
          details:
            "Electronic Biomedical Equipment Repairer (35S), APACHE Attack Helicopter Systems Repairer (94K), Aerial Photo Sensor Repairer (26F), Test, Measurement, and Diagnostic Equipment (TMDE) Maintenance Support Specialist (94H), Integrated Family of Test Equipment Operator/Maintainer (35Y), Special Electrical Devices Repairer (35E), Special Electronic Devices Repairer (35F), Photographic Equipment Repair Chief (41H), Special Electronics Devices Repairer (39E), Computer/Detection Systems Repairer (94F), Meteorological Equipment Repairman (35D), Projector Repairman (41F), X-Ray Biomedical Equipment Repairer (35T), APACHE Attack Helicopter Systems Repairer (35K), Automatic Test Equipment Operator/Maintainer (39B), Aerial Surveillance Photo Equipment Repairer (RC) (41G), Audio-Visual Equipment Repairer (41E), TMDE Maintenance Support Specialist (35H), Audio Specialist (84D), Radio Propagation Specialist (26P), Automatic Test Systems Operator/Maintainer (94Y)"
        },
        {
          id: "174",
          label: "Lithography, General",
          details:
            "Printing and Bindery Specialist (83F), Photo & Layout Specialist (83E), Lithographer (81L), Lithographer (21L), Photolithography Chief (83Z), Process Photographer (83D)"
        },
        {
          id: "172",
          label: "Electricians / Utilities, General",
          details:
            "Transmission & Distribution Specialist (RC) (52G), Water Treatment Specialist (92W), Heating & Ventilating Specialist (51J), Powerline Distribution Specialist (RC) (12Q), Interior Electrician (51R), Plumber (21K), Interior Electrician (21R), Utilities Equipment Repairer (91C), Water Treatment & Plumbing Systems Specialist (51N), Plumber (51K), Heating & Cooling Specialist (51L), Water Treatment Specialist (77W), Plumber (12K), Interior Electrician (12R), Utilities Engineering Supervisor (51P), Utilities Equipment Repairer (52C), Powerline Distribution Specialist (RC) (21Q)"
        },
        {
          id: "141",
          label: "Drafting / Illustrating / Mapping / Surveying",
          details:
            "Terrain Analyst (81Q), Topographic Computer (82E), Geospatial Engineer (12Y), Construction Surveyor (82B), Field Artillery Surveyor (82C), Technical Engineer (21T), Cartographer (81C), Geospatial Engineer (21Y), Field Artillery Surveyor (13S), Topographic Engineering Supervisor (81Z), Sound Ranging Crewman (17C), Technical Engineering Specialist (51T), Technical Engineer (12T), Topographic Analyst (81T), Topographic Analyst (21U), Topographic Surveyor (21S), Illustrator (81E), Technical Drafting Specialist (81B), Topographic Surveyor (82D), Rodman & Tapeman (82A), Field Artillery Surveyor/Meteorological Crewmember (13T), Graphics Documentation Specialist (25Q), General Draftsman (81A), Flash Ranging Crewman (17D)"
        },
        {
          id: "126",
          label: "Communications Center Operations,General",
          details:
            "Telecommunications Operations Chief (25W), Automatic Data Telecommunications Operator (72G), Telecommunications Operations Chief (31W), Chief Signal NCO (25X), Network Switching Systems Operator-Maintainer (25F), MSE Transmission System Operator (31D), Cryptographic Center Specialist (72D), Communications Center Specialist (72B), Telecommunications Systems Supervisor (31Y), Telecommunications Operator-Maintainer (25D), Senior Signal Sergeant (31Z), Telecommunications Operator-Maintainer (74C), Communications Systems/Circuit Controller (31N), Network Switching Systems Operator-Maintainer (31F), Tactical Telecommunications Center Operator (72E), Nodal Network Systems Operator-Maintainer (25N), Data Communications Center Specialist (72F), Central Office Operations Operator (72H), Central Office Switchboard Operator (72C)"
        },
        {
          id: "140",
          label: "Photography, General",
          details:
            "Combat Documentation/Production Specialist (25V), Still Photographic Specialist (84B), Multimedia Illustrator (25M), Motion Picture Specialist (84C), Photographic Laboratory Specialist (84G), Television Cameraman (84E), Visual Information Operations Chief (25Z), Audio/Television Specialist (84F), Visual Information/Audio Documentation Systems Specialist (25P), Still Documentation Specialist (25S), Visual Information Equipment Operator-Maintainer (25R)"
        },
        {
          id: "153",
          label: "Operators / Analysts / Programmers",
          details:
            "Card & Tape Writer (71U), Information Systems Chief (74Z), Information Systems Chief (25Y), Information Technology Specialist (25B), Computer/Machine Operator (74D), Information Systems Operator-Analyst (74B), Computer Systems Operator (74E), Software Analyst (74F)"
        },
        {
          id: "162",
          label: "Central Office / Lineman",
          details:
            "Antenna Installer Specialist (36D), Manual Central Office Repairman (36G), Cable Systems Installer-Maintainer (31L), Cable Splicer (36E), Tactical Wire Operations Specialist (36K), Wire Systems Equipment Repairer (35N), Dial/Manual Central Office Repairer (36H), Switching Systems Operator (36M), Transportable Automatic Switching Systems Operator/Maintainer (36L), Cable Systems Installer-Maintainer (25L), Switching Central Repairer (29N), Wire Systems Installer (36C)"
        },
        {
          id: "124",
          label:
            "Counterintelligence / Image Interpretation / Language Interrogation/Interpretation / Operational Intelligence",
          details:
            "Human Intelligence Collector (97E), Area Intelligence Specialist (97C), Counter Intelligence Agent (35L), Psychological Operations Specialist (96F), Expert Linguist (04C), Intelligence Senior Sergeant (96Z), Intelligence Senior Sergeant/Chief Intelligence Sergeant (35X), Counterintelligence Agent (97B), Intelligence Analyst (35F), Translator-Interpreter (04B), Interrogator (96C), Intelligence Analyst (96B), Chief Counterintelligence/Human Intelligence Sergeant (35Y), Military Intelligence Coordinator (97D), Ground Surveillance Systems Operator (96R), Interpreter/Translator (09L), Psychological Operations Specialist (37F), Attache Specialist (71S), Human Intelligence Collector (35M), Counterintelligence/Human Intelligence, Senior Sergeant (97Z), Translator/Interpreter (RC) (97L), Imagery Analyst (96D), Geospatial Intelligence Imagery Analyst (35G)"
        },
        {
          id: "127",
          label: "Cyberspace Operations, General",
          details:
            "Cyber Operations Specialist (17C), Cyber Network Defender (25D)"
        },
        {
          id: "130",
          label:
            "Behavioral Sciences / Mental Health Services / Licensed Practical Nurse / Medical Care and Treatment, General / Operating Room Services / Orthopedic Services / Physical/Occupational Therapy Services / Respiratory Therapy Services",
          details:
            "Chief Medical NCO (68Z), Cardiac Specialist (91N), Medical Specialist (91A), Orthopedic Specialist (68B), Ear, Nose, & Throat (ENT) Specialist (91U), Physical Therapy Specialist (68F), Operating Room Specialist (68D), Chief Medical NCO (91Z), Cardiovascular Specialist (68N), Practical Nurse (91C), Behavioral Science Specialist (91G), Respiratory Specialist (68V), Mental Health Specialist (91X), Orthotic Specialist (42C), Behavioral Health Specialist (68X), Occupational Therapy Specialist (68L), Occupational Therapy Specialist (91L), Respiratory Specialist (91V), Health Care Specialist (91W), Physical Therapy Specialist (91J), Orthopedic Specialist (91H), Combat Medic Specialist (68W), Ear, Nose, and Throat (ENT) Specialist (68U), Practical Nursing Specialist (68C), Operating Room Specialist (91D), Physical Reconditioning Specialist (91K), Psychiatric Specialist (91F)"
        },
        {
          id: "132",
          label:
            "Biomedical Equipment Maintenance and Repair Services / Diet Therapy / Environmental Health/Preventive Medicine Services / Ophthalmology/Optometry / Veterinary Medicine",
          details:
            "Optical Laboratory Specialist (42E), Eye Specialist (68Y), Medical Equipment Repairer, Advanced (35U), Health Physics Specialist (91X), Medical Equipment Repairer, Unit Level (35G), Medical Equipment Repairer (91A), Optical Laboratory Specialist (91H), Veterinary Food Inspection Specialist (91R), Optical Laboratory Specialist (68H), Preventive Medicine Specialist (91S), Animal Care Specialist (68T), Hospital Food Service Specialist (94F), Nutrition Care Specialist (91M), Veterinary Food Inspection Specialist (68R), Biomedical Equipment Specialist (68A), Animal Care Specialist (91T), Nutrition Care Specialist (68M), Preventive Medicine Specialist (68S), Eye Specialist (91Y)"
        },
        {
          id: "195",
          label: "Not Occupationally Qualified, General",
          details:
            "WAC Trainee (09E), EW/SIGINT Specialty (Linguist) (Reporting Code) (98X), Unqualified in Authorized Army MOS (09U), Basic Trainee (09B), Special Forces Candidate Training Accession Reporting Code (18X), Infantry Training Accession Reporting Code (11X), Field Artillery Computer Systems Specialist Training Accession Reporting Code (13X), Military Intelligence Linguist Training Accession Reporting Code (35W), Air Defense (Reporting Code) (16X)"
        },
        {
          id: "157",
          label: "Information and Education, General",
          details:
            "Radio/Television Systems Specialist (26T), Civil Affairs Specialist (38B), Public Affairs Chief (84Z), Chief Public Affairs NCO (46Z), Civil Affairs Specialist (RC) (38A), Journalist (71Q), Public Affairs Mass Communication Specialist (46S), Public Affairs Broadcast Specialist (46R), Public Affairs Specialist (46Q), TV/Radio Broadcast Operations Chief (84T), Broadcast Journalist (71R)"
        },
        {
          id: "131",
          label: "Biomedical Laboratory Services / Pharmacy / Radiology",
          details:
            "Radiology Specialist (91P), Medical Specialist (91B), Cytology Specialist (92E), Medical Laboratory Specialist (91K), Biological Sciences Assistant (01H), Pharmacy Specialist (68Q), Medical Laboratory Specialist (92B), Pharmacy Specialist (91Q), Electroencepthalography Specialist (91M), Nuclear Medicine Specialist (91W), Medical Laboratory Specialist (68K), Radiology Specialist (68P)"
        },
        {
          id: "151",
          label: "Administration, General / Legal / Stenography",
          details:
            "Equipment Maintenance Clerk (71T), Paralegal Specialist (27D), Executive Administrative Assistant (71C), Clerk-Typist (71B), Administrative Specialist (42L), Legal Specialist (71D), Administrative Specialist (71L), Court Reporter (71E)"
        },
        {
          id: "176",
          label: "Fabric, Leather, and Rubber, General",
          details:
            "Fabric Repair Specialist (43M), Canvas Repairman (43K), Textile Repairman (43J)"
        },
        {
          id: "170",
          label:
            "Machinists / Metal Body Repair / Metalworking, General / Welding",
          details:
            "Metal Worker (44B), Metal Worker (91W), Marine Hull Repairer (61F), Welder (44C), Metalworking Apprentice (44A), Machinist (44E), Allied Trades Specialist (91E)"
        },
        {
          id: "154",
          label: "Auditing and Accounting / Disbursing",
          details:
            "Finance Senior Sergeant (73Z), Accounting Specialist (73D), Financial Management Technician (44C), Finance Specialist (73C), Financial Management Technician (36B)"
        },
        {
          id: "133",
          label: "Dental Care, General / Dental Laboratory",
          details:
            "Dental Specialist (68E), Dental Laboratory Specialist (42D), Dental Specialist (91E), Dental Fixed Prosthetic Specialist (42F)"
        },
        {
          id: "134",
          label: "Medical Administration / Medical Logistics",
          details:
            "Medical Logistics Specialist (68J), Medical Logistics Specialist (91J), Patient Administration Specialist (91G), Medical Supply Specialist (76J), Patient Administration Specialist (68G), Patient Administration Specialist (71G)"
        },
        {
          id: "166",
          label: "Electric Power / Nuclear Power",
          details:
            "Power-Generation Equipment Repairer (52D), Prime Power Production Specialist (12P), Locomotive Electrician (RC) (65F), Nuclear Power Plant Electrician/Operator (52J), Tactical Power Generation Specialist (91D), Nuclear Power Plant Chief (52M), Prime Power Production Specialist (21P), Locomotive Electrician (RC) (88S), Diesel-Electric Locomotive Repairman (65C), Power Generation Equipment Operator/Mechanic (52B), Nuclear Power Plant Instrumentman/Operator (52K), Nuclear Power Plant Mechanic/Operator (52H), Turbine Engine Driven Generator Repairer (52F), Nuclear Power Plant Process Control Specialist/Operator (52L), Prime Power Production Specialist (52E)"
        },
        {
          id: "161",
          label:
            "Automotive, General / Construction Equipment / Tracked Vehicles",
          details:
            "M60A1/A3 Tank System Mechanic (63N), Construction Equipment Repairer (62B), Recovery Specialist (63F), Mechanical Maintenance Helper (63A), STRYKER Systems Maintainer (91S), Artillery Mechanic (63D), Wheeled Vehicle Repairer (91B), M1 Abrams Tank System Maintainer (91A), Wheel Vehicle Repairer (63W), BRADLEY Fighting Vehicle System Mechanic (63T), Tracked Vehicle Repairer (91H), Wheeled Vehicle Mechanic (63B), M60A2 Tank System Mechanic (63R), Heavy Wheel Vehicle Mechanic (63S), Fuel & Electrical System Repairer (63G), Track Vehicle Mechanic (63Y), M1 ABRAMS Tank System Mechanic (63E), Track Vehicle Mechanic (63C), Mechanical Maintenance Supervisor (63Z), Senior Maintenance Supervisor (91Z), BRADLEY Fighting Vehicle System Maintainer (63M), Self Propelled Artillery Systems Maintainer (91P), Construction Equipment Repairer (91L), Track Vehicle Repairer (63H), Special Purpose Equipment Repairer (52X), BRADLEY Fighting Vehicle System Maintainer (91M), Maintenance Supervisor (63X), Maintenance Supervisor (91X)"
        },
        {
          id: "142",
          label: "Weather, General",
          details:
            "Field Artillery Meteorological Crewmember (93F), Meteorological Observer (93E), Field Artillery Meteorological Crewmember (13W)"
        },
        {
          id: "155",
          label:
            "Flight Operations / Postal / Supply Administration / Transportation / Unit Supply",
          details:
            "Contracting Noncommissioned Officer (NCO) (51C), Aviation Operations Specialist (93P), Materiel Control & Accounting Specialist (76P), Special Purpose Materiel Supply Specialist (76Q), Aviation Operations Specialist (15P), Senior Noncommissioned Logistician (92Z), Aircraft Materiel Supply Specialist (76T), Unit Supply Specialist (76Y), Traffic Management Coordinator (71N), Equipment Records & Parts Specialist (76C), Materiel Supply Specialist (76D), Senior Supply/Service Sergeant (76Z), Ammunition Stock Control & Accounting Specialist (55R), Communications Electronics (COMMEL) Materiel Supply Specialist (76U), Flight Operations Coordinator (71P), Subsistence Supply Specialist (76X), Transportation Management Coordinator (88N), Unit Supply Specialist (92Y), Automated Logistical Specialist (92A), Weapons Material Supply Specialist (76R), Materiel Storage & Handling Specialist (76V), Supplyman (76A), Railway Movement Coordinator (RC) (65K), Postal Clerk (71F), Vehicle Materiel Supply Specialist (76S), Procurement Sergeant (76N), Railway Movement Coordinator (RC) (88W)"
        },
        {
          id: "169",
          label: "Other Mechanical and Electrical Equipment, General",
          details:
            "Quartermaster and Chemical Equipment Repairer (63J), Railway Car Repairer (RC) (88Q), Locomotive Repairer (RC) (65B), Railway Car Repairer (RC) (65D), Airbrake Repairer (RC) (88R), Chemical Equipment Repairer (54D), Reproduction Equipment Repair Specialist (41K), Railway Equipment Repairer (RC) (88P), Airbrake Repairer (RC) (65E), Quartermaster and Chemical Equipment Repairer (91J), QM Heavy Equipment Repairman (63K)"
        },
        {
          id: "160",
          label:
            "Aircraft Accessories / Aircraft Engines / Aircraft Structures / Aircraft, General",
          details:
            "AH-64 Attack Helicopter Repairer (67R), UH-1 Helicopter Repairer (RC) (15M), Medium Helicopter Technical Inspector (66U), U-1A Airplane Repairman (67C), Aircraft Maintenance Senior Sergeant (67Z), Utility Helicopter Technical Inspector (66N), Attack Helicopter (AH-1) Technical Inspector (66Y), Aircraft Quality Control Supervisor (67W), Attack Helicopter (AH-64) Technical Inspector (66R), Aircraft Pneudraulics Repairer (15H), OH-13/OH-23 Helicopter Repairman (67M), UH-60 Helicopter Repairer (15T), O-1/U-6 Airplane Repairman (67B), Utility Airplane Repairer (RC) (67G), OH-58D Scout Helicopter Repairer (67S), General Aircraft Repairer (67A), Airplane Technical Inspector (67F), Aircraft Powerplant Repairer (15B), OH-58D/Armament/Electrical/Avionics Systems Repairer (15J), Aircraft Electrician (68F), Aircraft Rotor & Propeller Repairman (68E), Aircraft Structural Repairer (68G), Aircraft Armament Technical Inspector (66J), Observation Airplane Technical Inspector (66H), Heavylift Helicopter Technical Inspector (66X), AH-1 Attack Helicopter Repairer (RC) (67Y), Scout Helicopter Technical Inspector (NISH) (66S), UH-1 Helicopter Repairer (67N), Aviation Senior Sergeant (15Z), Avionics Maintenance Supervisor (68P), OH-58D Armament/Electrical/Avionics Systems Repairer (68S), Aircraft Pneudraulics Repairer (68H), Utility Airplane Technical Inspector (66G), OH-58D Helicopter Repairer (15S), Aircraft Powertrain Repairer (68D), Observation/Scout Helicopter Repairer (RC) (15V), Aircraft Electrician (15F), Aircraft Structural Repairer (15G), Aircraft Powertrain Repairer (15D), Aircraft Components Repair Supervisor (68K), Observation/Scout Helicopter Technical Inspector (66V), Observation Airplane Repairer (67H), UH-60 Helicopter Repairer (67T), Aircraft Weapons Systems Repairer (68M), Aircraft Powerplant Repairer (68B), AH-64 Attack Helicopter Repairer (15R), CH-47 Helicopter Repairer (15U), Tactical Transport Helicopter Technical Inspector (66T), Unmanned Aircraft Systems Repairer (15E), Observation/Scout Helicopter Repairer (67V), Heavy Lift Helicopter Repairer (67X), Aircraft Components Repair Supervisor (15K), CH-47 Helicopter Repairer (67U)"
        },
        {
          id: "152",
          label:
            "Combined Personnel and Administration, General / First Sergeants, Sergeants Major, and Leading Chiefs",
          details:
            "Command Sergeant Major (CSM) MOS Immaterial (00X), Command Sergeant Major (CSM) Logistics (00L), Nominative Command Sergeant Major/Sergeant Major (00Z), Human Resources Specialist (42A), Sergeant Major (SGM) MOS Immaterial (00E), Command Sergeant Major (CSM) Maneuver Support(MS)/Logistics (00K), Command Sergeant Major (CSM) Infantry/Armor Immaterial (00R), Command Sergeant Major (CSM) Infantry/Armor/Field Artillery/Combat Engineer Immaterial (00T), Command Sergeant Major (CSM) Force Sustainment (00P), Command Sergeant Major (CSM) Engineer/Signal/Military Police/Military Intelligence Immaterial (00J)"
        },
        {
          id: "182",
          label:
            "Missile Fuel and Petroleum / Warehousing and Equipment Handling",
          details:
            "Petroleum Supply Specialist (77F), Cargo Specialist (57H), Cargo Specialist (88H), Petroleum Supply Specialist (92F), Petroleum Supply Specialist (76W)"
        },
        {
          id: "181",
          label: "Motor Vehicle Operators / Railway Operators",
          details:
            "Train Crewmember (RC) (88V), Motor Transport Operator (64C), Railway Specialist (USAR only) (88U), Railway Senior Sergeant (RC) (65Z), Motor Transport Operator (88M), Transportation Senior Sergeant (64Z), Transportation Senior Sergeant (88Z), Train Crewmember (RC) (65J), Railway Senior Sergeant (RC) (88X), Locomotive Operator (RC) (65H)"
        },
        {
          id: "163",
          label:
            "Missile Engine / Missile Launch and Support Facilities / Missile Mechanic",
          details:
            "CHAPARRAL System Mechanic (24N), Engineer Missile Equipment Specialist (62C), SERGEANT Electrical-Mechanical Repairman (46L), PATRIOT Operator System Mechanic (24T), HAWK Master Mechanic (24R), PERSHING Electrical-Mechanical Repairer (46N), HAWK Firing Section Mechanic (24C), HAWK Missile System Mechanic (23R), VULCAN System Mechanic (24M)"
        },
        {
          id: "165",
          label: "Auxiliaries",
          details:
            "Amphibian Engineer (61E), Watercraft Engineer (88L), Watercraft Engineer (61C)"
        },
        {
          id: "167",
          label: "Precision Equipment, General",
          details:
            "Office Machine Repairer (41J), Topographic Instrument Repair Specialist (41B), FC Instrument Repairer (41C)"
        },
        {
          id: "183",
          label: "Corrections / Investigations / Law Enforcement, General",
          details:
            "Corrections and Detention Specialist (31E), Military Working Dog (MWD) Handler (31K), Senior Military Police Sergeant (31Z), Military Police (95B), Dog Trainer (00C), Internment/Resettlement Specialist (95C), Military Police (31B), CID Special Agent (31D), CID Special Agent (95D)"
        },
        {
          id: "175",
          label: "Industrial Gas and Fuel Production, General",
          details:
            "Carbon Dioxide-Hydrogen Production Specialist (53C), Industrial Gas Production Specialist (RC) (53B)"
        },
        {
          id: "179",
          label: "Other Craftsworkers, N.E.C., General",
          details: "Camouflage Specialist (51E)"
        },
        {
          id: "180",
          label: "Food Service, General / Stewards and Enlisted Aides",
          details:
            "Food Service Helper (94A), Baker (94D), Enlisted Aide (00H), Food Service Supervisor (94Z), Food Service Specialist (94B), Club/Community Activities Manager (00J), Culinary Specialist (92G)"
        },
        {
          id: "184",
          label: "Laundry and Personal Service, General",
          details:
            "Laundry & Bath Specialist (57E), Shower and Laundry Specialist (92S)"
        },
        {
          id: "185",
          label: "Auxiliary Labor, General",
          details:
            "Duty Soldier (57A), Railway Section Repairer (RC) (88T), Duty Foreman (57G), Railway Section Repairer (RC) (65G)"
        },
        {
          id: "190",
          label: "Patients",
          details:
            "National Guard (NG) on Active Duty Medical Hold (09G), U.S. Army Reserve (USAR) on Active Duty Medical Hold (09H)"
        },
        {
          id: "191",
          label: "Cadets and Other Officer Candidates / Students",
          details:
            "College Trainee (09D), Trainee, Language, Fort Allen PR (09E), Simultaneous Membership Program Participant (RC) (09R), Nurse Corps Candidate (09N), GED Completion Program (09J), March 2 Success (09M), Commissioned Officer Candidate (09S), Reserve Forces Report Code (09T), Warrant Officer Candidate (09W), Army Legal Immigrant Healthcare Professional Officer Candidate (09Q), Trainee, Unassigned (09B)"
        },
        {
          id: "192",
          label: "Undesignated Occupations, General",
          details:
            "Armor Recruit (19A), Special Duty Assignment (00D), Trainee, Language (09C), Special Duty Assignment AFSC (00S), MOS Immaterial U.S. Army Reserve (USAR) (00G), MOS Immaterial National Guard Bureau (NGB) (00F)"
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
