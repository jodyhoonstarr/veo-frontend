<template>
  <v-content>
    <v-container>
      <v-layout text-center wrap>
        <!-- LOGO -->
        <v-flex xs12>
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
          ></v-img>
        </v-flex>

        <!-- WELCOME -->
        <v-flex mb-4>
          <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
          <p class="subheading font-weight-regular">
            For help and collaboration with other Vuetify developers,
            <br />please join our online
            <a href="https://community.vuetifyjs.com" target="_blank"
              >Discord Community</a
            >
          </p>
        </v-flex>

        <!-- WHATS NEXT -->
        <v-flex mb-5 xs12>
          <h2 class="headline font-weight-bold mb-3">What's next?</h2>

          <v-layout justify-center>
            <a
              v-for="(next, i) in whatsNext"
              :key="i"
              :href="next.href"
              class="subheading mx-3"
              target="_blank"
              >{{ next.text }}</a
            >
          </v-layout>
        </v-flex>

        <!-- IMPORTANT LINKS -->
        <v-flex xs12 mb-5>
          <h2 class="headline font-weight-bold mb-3">Important Links</h2>

          <v-layout justify-center>
            <a
              v-for="(link, i) in importantLinks"
              :key="i"
              :href="link.href"
              class="subheading mx-3"
              target="_blank"
              >{{ link.text }}</a
            >
          </v-layout>
        </v-flex>

        <!-- ECOSYSTEM -->
        <v-flex xs12 mb-5>
          <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

          <v-layout justify-center>
            <a
              v-for="(eco, i) in ecosystem"
              :key="i"
              :href="eco.href"
              class="subheading mx-3"
              target="_blank"
              >{{ eco.text }}</a
            >
          </v-layout>
        </v-flex>

        <!-- TEXT BLOCK -->
        <v-flex xs12 mb-5>
          <h2 class="headline font-weight-bold mb-3">Text Block</h2>
          <p class="mb-6">
            It was the best of times, it was the worst of times, it was the age
            of wisdom, it was the age of foolishness, it was the epoch of
            belief, it was the epoch of incredulity, it was the season of Light,
            it was the season of Darkness, it was the spring of hope, it was the
            winter of despair, we had everything before us, we had nothing
            before us, we were all going direct to Heaven, we were all going
            direct the other way--in short, the period was so far like the
            present period, that some of its noisiest authorities insisted on
            its being received, for good or for evil, in the superlative degree
            of comparison only.
          </p>
          <p class="mb-6">
            There were a king with a large jaw and a queen with a plain face, on
            the throne of England; there were a king with a large jaw and a
            queen with a fair face, on the throne of France. In both countries
            it was clearer than crystal to the lords of the State preserves of
            loaves and fishes, that things in general were settled for ever.
          </p>
          <p class="mb-6">
            It was the year of Our Lord one thousand seven hundred and
            seventy-five. Spiritual revelations were conceded to England at that
            favoured period, as at this. Mrs. Southcott had recently attained
            her five-and-twentieth blessed birthday, of whom a prophetic private
            in the Life Guards had heralded the sublime appearance by announcing
            that arrangements were made for the swallowing up of London and
            Westminster. Even the Cock-lane ghost had been laid only a round
            dozen of years, after rapping out its messages, as the spirits of
            this very year last past (supernaturally deficient in originality)
            rapped out theirs. Mere messages in the earthly order of events had
            lately come to the English Crown and People, from a congress of
            British subjects in America: which, strange to relate, have proved
            more important to the human race than any communications yet
            received through any of the chickens of the Cock-lane brood.
          </p>
          <p class="mb-6">
            France, less favoured on the whole as to matters spiritual than her
            sister of the shield and trident, rolled with exceeding smoothness
            down hill, making paper money and spending it. Under the guidance of
            her Christian pastors, she entertained herself, besides, with such
            humane achievements as sentencing a youth to have his hands cut off,
            his tongue torn out with pincers, and his body burned alive, because
            he had not kneeled down in the rain to do honour to a dirty
            procession of monks which passed within his view, at a distance of
            some fifty or sixty yards. It is likely enough that, rooted in the
            woods of France and Norway, there were growing trees, when that
            sufferer was put to death, already marked by the Woodman, Fate, to
            come down and be sawn into boards, to make a certain movable
            framework with a sack and a knife in it, terrible in history. It is
            likely enough that in the rough outhouses of some tillers of the
            heavy lands adjacent to Paris, there were sheltered from the weather
            that very day, rude carts, bespattered with rustic mire, snuffed
            about by pigs, and roosted in by poultry, which the Farmer, Death,
            had already set apart to be his tumbrils of the Revolution. But that
            Woodman and that Farmer, though they work unceasingly, work
            silently, and no one heard them as they went about with muffled
            tread: the rather, forasmuch as to entertain any suspicion that they
            were awake, was to be atheistical and traitorous.
          </p>
          <p class="mb-6">
            In England, there was scarcely an amount of order and protection to
            justify much national boasting. Daring burglaries by armed men, and
            highway robberies, took place in the capital itself every night;
            families were publicly cautioned not to go out of town without
            removing their furniture to upholsterers' warehouses for security;
            the highwayman in the dark was a City tradesman in the light, and,
            being recognised and challenged by his fellow- tradesman whom he
            stopped in his character of "the Captain," gallantly shot him
            through the head and rode away; the mall was waylaid by seven
            robbers, and the guard shot three dead, and then got shot dead
            himself by the other four, "in consequence of the failure of his
            ammunition:" after which the mall was robbed in peace; that
            magnificent potentate, the Lord Mayor of London, was made to stand
            and deliver on Turnham Green, by one highwayman, who despoiled the
            illustrious creature in sight of all his retinue; prisoners in
            London gaols fought battles with their turnkeys, and the majesty of
            the law fired blunderbusses in among them, loaded with rounds of
            shot and ball; thieves snipped off diamond crosses from the necks of
            noble lords at Court drawing-rooms; musketeers went into St.
            Giles's, to search for contraband goods, and the mob fired on the
            musketeers, and the musketeers fired on the mob, and nobody thought
            any of these occurrences much out of the common way. In the midst of
            them, the hangman, ever busy and ever worse than useless, was in
            constant requisition; now, stringing up long rows of miscellaneous
            criminals; now, hanging a housebreaker on Saturday who had been
            taken on Tuesday; now, burning people in the hand at Newgate by the
            dozen, and now burning pamphlets at the door of Westminster Hall;
            to-day, taking the life of an atrocious murderer, and to-morrow of a
            wretched pilferer who had robbed a farmer's boy of sixpence.
          </p>
          <p class="mb-6">
            All these things, and a thousand like them, came to pass in and
            close upon the dear old year one thousand seven hundred and
            seventy-five. Environed by them, while the Woodman and the Farmer
            worked unheeded, those two of the large jaws, and those other two of
            the plain and the fair faces, trod with stir enough, and carried
            their divine rights with a high hand. Thus did the year one thousand
            seven hundred and seventy-five conduct their Greatnesses, and
            myriads of small creatures--the creatures of this chronicle among
            the rest--along the roads that lay before them.
          </p>
        </v-flex>

        <!-- LAST LINE -->
        <v-flex xs12 mb-5>
          <h2 class="headline font-weight-bold mb-3">Last Line Here</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "VEOContent",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
};
</script>
