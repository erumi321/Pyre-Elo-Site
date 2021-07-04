const characterData = {}

// characterToImage[class name][character name]
characterData.characterToImage = {
    "Crone": {
        "Bertrude":"Crone_Bertrude_01B",
        "Vorfrit":"Crone_Beyonders_01B",
        "Udmildhe":"Crone_Udmildhe_01B"
    },
    "Cur": {
        "Barker":"Cur_Barker_01B",
        "Dalbert":"Cur_Dalbert_01B",
        "Rukey":"Cur_Rukey_01B"
    },
    "Demon": {
        "Vispaleth":"Demon_Accusers_01B",
        "Ignarius":"Demon_Ignarius_02B",
        "Jodi":"Demon_Jodi_01B"
    },
    "Oralech":{
        "Oralech":"Demon_Oralech_01B",
    },
    "Harp": {
        "Xaxiana":"Harp_Chastity_01B",
        "Pamitha":"Harp_Pamitha_01B",
        "Tamitha":"Harp_Tamitha_01B",
    },
    "Imp": {
        "Raji":"Imp_Fate_01B",
        "Tizo":"Imp_Tizo_02B",
        "Messenger Imp":"Imp_NPC_01B",
    },
    "Savage": {
        "Almer":"Savage_Almer_01B",
        "Garepth":"Savage_TrueNightwings_01B",
        "Mae":"Savage_Mae_01B",
    },
    "Nomad": {
        "Lendel":"Nomad_Lendel_01B",
        "Sandra":"Nomad_Sandra_01B",
        "Hedwyn":"Nomad_Hedwyn_01B_Wry",
    },
    "Sap": {
        "Palmis":"Sap_Beyonders_01B",
        "Manley":"Sap_Manley_01B",
        "Volfred":"Sap_Volfred_01B",
    },
    "Wyrm": {
        "Sir Deluge":"Wyrm_Deluge_01B",
        "Sir Gilman":"Wyrm_Gilman_02B",
        "Lady River":"Wyrm_Tempers_01B"
    }
}
// characterToImage[class name][skill name]
characterData.classSkills = {
    "Crone": {
        "Hex of Defeat": "When your Pyre is lower than your adversaries', the crone deals an extra 5 to their Pyre.",
        "Greater Blast": "Increase the angle of your Aura Blast, banishing adversaries in a wider area.",
        "Sudden Blast": "Majorly reduces the charge time of Aura Blast so you can use it more often.",
        "Stubborn Flame": "When your Pyre is lower than your adversaries', adversaries deal 10 less damage to your Pyre.",
        "Hex of Victory": "When your Pyre is higher than your adversaries', the crone deals an extra 5 to their Pyre.",
        "Vital Pounce": "After pouncing an adversary, instantly recover all Stamina.",
        "Serpent Swiftness": "While slithering, use half as much Stamina and move 30% more quickly.",
        "Feral Curse": "Once each Rite, turn adversaries into fast-moving Howlers upon saluting."
    },
    "Cur": {
        "Cloud Jump": "The cur can jump a second time while airborne.",
        "Lightning Run": "When sprinting, the cur accelerates faster than usual to an even faster top speed.",
        "Lucky Break": "After the cur is banished by an adversary, the cur has a 50% chance to return in only 1 sec.",
        "Moon Sault": "The cur can jump a second or third time while airborne.",
        "Glory Dive": "The cur deals an additional 5 Glory when plunging into the adversary's Pyre.",
        "Keen Eye": "The cur casts his Aura +50% farther than usual.",
        "Explosive Temper": "When the cur banishes adversaries by casting his Aura, the blast can banish nearby adversaries.",
        "Guiding Light": "After plunging into the adversary's Pyre, the cur soon returns, rather than remaining banished."
    },
    "Demon": {
        "Long Stride": "After using Rush, Rush again.",
        "Crushing Heel": "When landing following a jump, stun adversaries and make them drop the Orb.",
        "Brazen Manner": "After saluting adversaries, for seven seconds, deal 10 extra damage to their Pyre.",
        "Celestial Spike": "Fling the Orb at adversaries to banish them.",
        "Relentless Vigor": "Recover all Stamina after banishing an adversary.",
        "Fierce Presence": "+4 Presence (permanent), increasing Aura size.",
        "Enduring Flame": "Gain 35+ Pyre at the beginning of a Rite.",
        "Greater Banishment": "Banned adversaries take 30% longer to return."
    },
    "Oralech":{
        "Long Stride": "After using Rush, Rush again.",
        "Crushing Heel": "When landing following a jump, stun adversaries and make them drop the Orb.",
        "Brazen Manner": "After saluting adversaries, for seven seconds, deal 10 extra damage to their Pyre.",
        "Celestial Spike": "Fling the Orb at adversaries to banish them.",
        "Relentless Vigor": "Recover all Stamina after banishing an adversary.",
        "Fierce Presence": "+4 Presence (permanent), increasing Aura size.",
        "Enduring Flame": "Gain 35+ Pyre at the beginning of a Rite.",
        "Greater Banishment": "Banned adversaries take 30% longer to return."
    },
    "Harp": {
        "Swift Flight": "Move faster than before while flying.",
        "Shrike Dash": "Use dash in rapid succession, with a lower stamina cost.",
        "Sleight of Wing": "Swap places with your nearest ally when saluting.",
        "Greater Celerity": "+8 Quickness.",
        "Winged Fury": "Move 30% faster for five seconds after banishing an adversary.",
        "Fell Swoop": "When casting your Aura, you can trigger Aura-Burst, banishing nearby adversaries.",
        "Relentless Pursuit": "Return twice as fast if banished while Winged Fury is active.",
        "Natural Superiority": "+4 to Quickness, Presence, and Hope.",
    },
    "Imp": {
        "Elusive Nature": "While fluttering or zipping, the imp moves much faster than usual.",
        "Safe Return": "After casting his Implode ability, the imp returns much faster than usual.",
        "Titans' Rage": "The imps Implode ability can banish adversaries in a much wider area.",
        "Inner Glory": "The imp deals an additional 10 Glory when dousing the adversary's Pyre.",
        "Moon Sign": "If banished, the imp drops a Moon Sign allies can instantly transport to from their Pyre.",
        "Last Laugh": "If banished, the imp automatically casts their Implode ability, if they do not possess the Orb.",
        "Wild Heart": "When saluting their adversaries, the imp turns into a fast-moving Howler, or back.",
        "Star Sign": "If banished, the imp drops an improved Moon Sign that boosts allies' speed and Stamina."
    },
    "Savage": {
        "Heightened Reflex": "The brief charge up time before the savage jumps or sprints is virtually eliminated.",
        "Traitor's Flight": "The savage jumps and Power-Jumps faster than usual.",
        "Webbed Feet": 'While sprinting, the savage slows nearby adversaries.',
        "False Step": "If the savage is banished while jumping, they shall instantly return at the origin of their jump.",
        "Snap Cast": "The brief charge-up time before the savage can cast their Aura is greatly reduced.",
        "Quick Fling": "The savage flings the Orb faster and farther than usual.",
        "Sudden Grasp": "When saluting their adversaries, the savage automatically leaps toward the Orb, if no one has it.",
        "Dark Vigor": "While grasping the Orb, the savage sprints and jumps without using Stamina."
    },
    "Nomad": {
        "Martial Training": "+50% Stamina.",
        "Critical Strike": "Increases range and width of Aura while Power-Casting.",
        "Shoulder Smash": "If the Nomad jumps into airborne adversaries, he banishes them.",
        "Burning Resolve": "Recover up to 50% of damage dealt to enemy Pyre for your own.",
        "Shared Tenacity": "The Nomad and their allies regenerate Stamina twice as fast.",
        "Moon Formation": "The Nomad and their allies move more quickly with the Orb.",
        "Sacred Bond": "The Nomad and their allies can instantly return banished allies by moving to where they were banished.",
        "Divine Retribution": "Increases banished timer for adversaries by two seconds.",
    },
    "Sap": {
        "Guardian Sapling": "When banished, spawn a Sapling near the Saps Pyre until you return.",
        "Sturdy Sapling": "The Saps Sapling spawns faster and has a larger Aura.",
        "Unstable Sapling": "Grants the ability to remotely detonate the Saps Sapling with Aura Burst.",
        "Numbing Gust": "When the Sap and their allies are banished, adversaries move slowly and cannot use abilities.",
        "Final Kindling": "Once each Rite, if the Saps Pyre is extinguished, it's restored by 10 instead (stacks with similar effects).",
        "Guardian Shield": "The Saps shield protects allies too instead of the Sap yourself.",
        "Steadfast Hope": "Grants a permanent +5 to Hope.",
        "Miracle Kindling": "Once each Rite, if the Sap's Pyre is extinguished, it's restored by 40 instead (stacks with similar effects)."
    },
    "Wyrm": {
        "Valiant Return": "If the Wyrm and their allies are banished, the Wyrm instantly returns to the battlefield.",
        "Stunning Claim": "Once per round after saluting, freeze all exiles (including your own) for three seconds.",
        "Heroic Stand": "When the Wyrm's allies are banished, they move faster and acquire infinite stamina.",
        "Seized Chance": "After the Wyrm banishes an adversary, for 10 seconds the Wyrm deal an extra 10 damage to the adversary's Pyre.",
        "Avenging Aid": "Return an ally instantly after the Wyrm banishes an adversary.",
        "Quick Draw": "Allows the Wyrm to use Slash twice. Upon the second activation, the Wyrm returns to their previous position.",
        "Greater Cleave": "Slash radius increases.",
        "Vigorous Slash": "Instantly recover all stamina after using Slash."
    }
}