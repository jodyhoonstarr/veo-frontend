<template>
  <div>
    <h1 class="text-center">This is the Occupation by Paygrade page</h1>
    <SelectBar>
      <v-col cols="12" xs="12" sm="4">
        <DropDown
          label="Paygrade"
          hint="Select Paygrade"
          :items="paygrades"
          v-model="selectedPaygrade"
          multiple
          close
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="5">
        <DropDown
          label="Occupation"
          hint="Select Occupation"
          :items="occupations"
          v-model="selectedOccupation"
          multiple
          close
        ></DropDown>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <DropDown
          label="Cohort"
          hint="Year of discharge"
          :items="cohorts"
          v-model="selectedCohort"
        ></DropDown>
      </v-col>
    </SelectBar>
  </div>
</template>

<script>
import SelectBar from "@/components/SelectBar.vue";
import DropDown from "@/components/DropDown.vue";

export default {
  name: "OccupationByPaygrade",
  components: {
    SelectBar,
    DropDown
  },
  data() {
    return {
      selectedPaygrade: null,
      selectedOccupation: null,
      selectedCohort: null,
      paygrades: [
        { id: "E1-E5", label: "Sergeant and below" },
        { id: "E6-E9", label: "Staff Sargeant and higher" }
      ],
      occupations: [
        { id: "10", label: "Infantry, Gun Crews, and Seamanship Specialists" },
        { id: "11", label: "Electronic Equipment Repairers" },
        { id: "12", label: "Communications and Intelligence pecialists" },
        { id: "13", label: "Health Care Specialists" },
        { id: "14", label: "Other Allied Professions" },
        { id: "15", label: "Functional Support and Administrtion" },
        { id: "16", label: "Electrical/Mechanical Equipment epairers" },
        { id: "17", label: "Craftsworkers" },
        { id: "18", label: "Service and Supply Handlers" },
        {
          id: "10X",
          label:
            "Special Forces, Missile Artillery, Operating Crew, Small Boat Operators, Combat Engineering, General, Infantry, General, Unmanned Vehicle System (UVS) Operators, General, Artillery and Gunnery, Armor and Amphibious, General, Rocket Artillery"
        },
        {
          id: "14X",
          label:
            "Surveying, Mapping, Nuclear, Biological, and Chemical Warfare Specialists, Musicians, General, Photography, General, Weather, General, Other Technical Specialists and Assistants, Drafting, Memorial Activities and Embalming, Firefighting and damage Control, EOD/UDT, Illustrating, Divers, Physical Science Laboratory"
        },
        {
          id: "15X",
          label:
            "Postal, Personnel, General, Unit Supply, Recreation and Welfare, Recruiting and Counseling, Auditing and Accounting, First Sergeants, Sergeants Major, and Leading Chiefs, Information and Education, General, Combined Personnel and Administration, General, Legal, Flight Operations, Supply Administration, Administration, General, Operators/Analysts, Disbursing, Programmers, Transportation, Chaplain's Assistants, Stenography"
        },
        {
          id: "11X",
          label:
            "Nuclear Weapons Equipment Repair, General, Teletype and Cryptographic Equipment, General, Surveillance/Target Acquisition and Tracking Radar, Airborne Fire Control, Electronic Instruments, N.E.C., Air Traffic Control Radar, Navigation, Communication, and Countermeasure, N.E.C., Training Devices, ADP Computers, General, Missile Checkout Equipment, Test Equipment, and Calibration, Communications Radio, Missile Guidance and Control, Shipboard and Other Fire Control"
        },
        {
          id: "12X",
          label:
            "Cyberspace Operations, General, Intercept Operators (Code and Non-Code), Radio Code, Communications Center Operations,General, Air Traffic Control, Radar, Analysis, Image Interpretation, Language Interrogation/Interpretation, Operational Intelligence, Electronic Countermeasures, Signal Intelligence/Electronic Warfare, General, Counterintelligence, Combat Operations Control, General, Non-Code Radio"
        },
        {
          id: "18X",
          label:
            "Stewards and Enlisted Aides, Warehousing and Equipment Handling, Motor Vehicle Operators, Food Service, General, Laundry and Personal Service, General, Corrections, Railway Operators, Missile Fuel and Petroleum, Forward Area Equipment Support, General, Law Enforcement, General, Investigations, Auxiliary Labor, General"
        },
        {
          id: "16X",
          label:
            "Ammunition Repair, Precision Equipment, General, Nuclear Weapons Maintenance and Assembly, Construction Equipment, Other Mechanical and Electrical Equipment, General, Automotive, General, Small Arms Repair, Artillery Repair, Missile Launch and Support Facilities, Lineman, Missile Engine, Aviation Ordnance, Aircraft Accessories, Central Office, Turret Repair, Aircraft, General, Aircraft Engines, Electric Power, Aircraft Structures, Nuclear Power, Auxiliaries, Missile Mechanic, Tracked Vehicles, Armament Maintenance, General"
        },
        {
          id: "17X",
          label:
            "Fabric, Leather, and Rubber, General, Woodworking, Electricians, Construction, General, Other Craftsworkers, N.E.C., General, Utilities, General, Construction Equipment Operation, Machinists, Metal Body Repair, Lithography, General, Industrial Gas and Fuel Production, General, Metalworking, General, Welding"
        },
        {
          id: "13X",
          label:
            "Physical/Occupational Therapy Services, Diet Therapy, Radiology, Operating Room Services, Dental Laboratory, Dental Care, General, Veterinary Medicine, Respiratory Therapy Services, Biomedical Laboratory Services, Behavioral Sciences/Mental Health Services, Medical Logistics, Medical Care and Treatment, General, Biomedical Equipment Maintenance and Repair Services, Ophthalmology/Optometry, Environmental Health/Preventive Medicine Services, Licensed Practical Nurse, Medical Administration, Pharmacy, Orthopedic Services"
        },
        {
          id: "19X",
          label:
            "Patients, Students, Undesignated Occupations, General, Cadets and Other Officer Candidates, Not Occupationally Qualified, General"
        }
      ],
      cohorts: [
        { id: "2000", label: "2000-2003" },
        { id: "2004", label: "2004-2007" },
        { id: "2008", label: "2008-2011" },
        { id: "2012", label: "2012-2015" }
      ]
    };
  }
};
</script>
