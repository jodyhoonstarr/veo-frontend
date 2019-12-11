<template>
  <div>
    <h1 class="text-center">This is the Paygrade page</h1>
  </div>
</template>

<script>
export default {
  name: "Paygrade",
  data() {
    return {
      paygrades: [
        { id: "E1", label: "Private" },
        { id: "E2", label: "Private (PV2)" },
        { id: "E3", label: "Private First Class (PFC)" },
        { id: "E4", label: "Corporal (CPL) or Specialist (SPC)" },
        { id: "E5", label: "Sergeant (SGT)" },
        { id: "E6", label: "Staff Sergeant (SSG)" },
        { id: "E7", label: "Sergeant First Class (SFC)" },
        { id: "E8", label: "Master Sergeant (MSG) or First Sergeant (1SG)" },
        {
          id: "E9",
          label:
            "Sergeant Major (SGM), Command Sergeant Major (CSM), or Sergeant Major of the Army (SMA)"
        }
      ],
      cohorts: [
        { id: "2000", label: "2000-2001" },
        { id: "2002", label: "2002-2003" },
        { id: "2004", label: "2004-2005" },
        { id: "2006", label: "2006-2007" },
        { id: "2008", label: "2008-2009" },
        { id: "2010", label: "2010-2011" },
        { id: "2012", label: "2012-2013" },
        { id: "2014", label: "2014-2015" }
      ]
    };
  }
};
</script>
