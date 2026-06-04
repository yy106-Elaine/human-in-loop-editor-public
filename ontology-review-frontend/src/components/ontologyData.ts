// AUTO-GENERATED from the four subontology source files. Do not hand-edit.
// Shape consumed by OntologyTree.tsx (and SemanticReview / ReviewerActions later).

export type NodeStatus =
  | 'conflict' | 'ambiguous' | 'inheritance' | 'suggestion' | 'approved' | 'none';

export interface OntologyNode {
  id: string;
  label: string;
  synset?: string | null;
  virtual?: boolean;
  verb?: string;        // verb-ontology link (Activities only)
  status: NodeStatus;
  children?: OntologyNode[];
}

// Keyed by subontology id; these four ids match the filter tabs.
export const ONTOLOGY: Record<string, OntologyNode> = {
 "physical": {
  "id": "physical",
  "label": "Physical",
  "synset": null,
  "virtual": false,
  "status": "none",
  "children": [
   {
    "id": "physical-artifact-1",
    "label": "artifact",
    "synset": "artifact.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-infrastructure-2",
    "label": "infrastructure",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-opening-3",
    "label": "opening",
    "synset": "opening.n.10",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-hole-4",
      "label": "hole",
      "synset": "hole.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-buttonhole-5",
        "label": "buttonhole",
        "synset": "buttonhole.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-manhole-6",
        "label": "manhole",
        "synset": "manhole.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-posthole-7",
        "label": "posthole",
        "synset": "posthole.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-puncture-8",
        "label": "puncture",
        "synset": "puncture.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-spout-9",
      "label": "spout",
      "synset": "spout.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-nozzle-10",
        "label": "nozzle",
        "synset": "nozzle.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-window-11",
      "label": "window",
      "synset": "window.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-bell-12",
      "label": "bell",
      "synset": "bell.n.10",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-exit-13",
      "label": "exit",
      "synset": "exit.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-intake-14",
      "label": "intake",
      "synset": "intake.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-port-15",
      "label": "port",
      "synset": "port.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-fixture-16",
    "label": "fixture",
    "synset": "fixture.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-plumbing-fixture-17",
      "label": "plumbing_fixture",
      "synset": "plumbing_fixture.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-water-faucet-18",
        "label": "water_faucet",
        "synset": "water_faucet.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-structure-19",
    "label": "structure",
    "synset": "structure.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-area-20",
      "label": "area",
      "synset": "area.n.05",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-room-21",
        "label": "room",
        "synset": "room.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-kitchen-22",
          "label": "kitchen",
          "synset": "kitchen.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-barroom-23",
          "label": "barroom",
          "synset": "barroom.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-closet-24",
          "label": "closet",
          "synset": "closet.n.04",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-booth-25",
            "label": "booth",
            "synset": "booth.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-compartment-26",
          "label": "compartment",
          "synset": "compartment.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-car-27",
            "label": "car",
            "synset": "car.n.04",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-cabinet-28",
            "label": "cabinet",
            "synset": "cabinet.n.03",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-stall-29",
            "label": "stall",
            "synset": "stall.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-classroom-30",
          "label": "classroom",
          "synset": "classroom.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-court-31",
          "label": "court",
          "synset": "court.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-hall-32",
          "label": "hall",
          "synset": "hall.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-anteroom-33",
          "label": "anteroom",
          "synset": "anteroom.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-lounge-34",
          "label": "lounge",
          "synset": "lounge.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-storeroom-35",
          "label": "storeroom",
          "synset": "storeroom.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-strongroom-36",
            "label": "strongroom",
            "synset": "strongroom.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-vault-37",
              "label": "vault",
              "synset": "vault.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "physical-enclosure-38",
        "label": "enclosure",
        "synset": "enclosure.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-pen-39",
          "label": "pen",
          "synset": "pen.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-cage-40",
          "label": "cage",
          "synset": "cage.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-hutch-41",
            "label": "hutch",
            "synset": "hutch.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-chamber-42",
          "label": "chamber",
          "synset": "chamber.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-cylinder-43",
            "label": "cylinder",
            "synset": "cylinder.n.03",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-furnace-44",
            "label": "furnace",
            "synset": "furnace.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-kiln-45",
              "label": "kiln",
              "synset": "kiln.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-cargo-area-46",
          "label": "cargo_area",
          "synset": "cargo_area.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-vivarium-47",
          "label": "vivarium",
          "synset": "vivarium.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-terrarium-48",
            "label": "terrarium",
            "synset": "terrarium.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-yard-49",
          "label": "yard",
          "synset": "yard.n.09",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-storage-space-50",
        "label": "storage_space",
        "synset": "storage_space.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-cupboard-51",
          "label": "cupboard",
          "synset": "cupboard.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-panopticon-52",
        "label": "panopticon",
        "synset": "panopticon.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-showroom-53",
          "label": "showroom",
          "synset": "showroom.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-building-54",
      "label": "building",
      "synset": "building.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-outbuilding-55",
        "label": "outbuilding",
        "synset": "outbuilding.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-kennel-56",
          "label": "kennel",
          "synset": "kennel.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-school-57",
        "label": "school",
        "synset": "school.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-gambling-house-58",
        "label": "gambling_house",
        "synset": "gambling_house.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-casino-59",
          "label": "casino",
          "synset": "casino.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-place-of-worship-60",
        "label": "place_of_worship",
        "synset": "place_of_worship.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-chapel-61",
          "label": "chapel",
          "synset": "chapel.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-church-62",
          "label": "church",
          "synset": "church.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-house-63",
        "label": "house",
        "synset": "house.n.12",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-courthouse-64",
          "label": "courthouse",
          "synset": "courthouse.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-morgue-65",
        "label": "morgue",
        "synset": "morgue.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-crematory-66",
          "label": "crematory",
          "synset": "crematory.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-library-67",
        "label": "library",
        "synset": "library.n.05",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-obstruction-68",
      "label": "obstruction",
      "synset": "obstruction.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-barrier-69",
        "label": "barrier",
        "synset": "barrier.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-movable-barrier-70",
          "label": "movable_barrier",
          "synset": "movable_barrier.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-door-71",
            "label": "door",
            "synset": "door.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-gate-72",
            "label": "gate",
            "synset": "gate.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-hatch-73",
            "label": "hatch",
            "synset": "hatch.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-fence-74",
          "label": "fence",
          "synset": "fence.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-hedge-75",
            "label": "hedge",
            "synset": "hedge.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-barricade-76",
          "label": "barricade",
          "synset": "barricade.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-roadblock-77",
          "label": "roadblock",
          "synset": "roadblock.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-dam-78",
          "label": "dam",
          "synset": "dam.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-railing-79",
          "label": "railing",
          "synset": "railing.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-safety-rail-80",
            "label": "safety_rail",
            "synset": "safety_rail.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-bannister-81",
          "label": "bannister",
          "synset": "bannister.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-hindrance-82",
        "label": "hindrance",
        "synset": "hindrance.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-clog-83",
          "label": "clog",
          "synset": "clog.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-tumbler-84",
        "label": "tumbler",
        "synset": "tumbler.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-guide-85",
      "label": "guide",
      "synset": "guide.n.06",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-building-complex-86",
      "label": "building_complex",
      "synset": "building_complex.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-plant-87",
        "label": "plant",
        "synset": "plant.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-factory-88",
          "label": "factory",
          "synset": "factory.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-establishment-89",
      "label": "establishment",
      "synset": "establishment.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-place-of-business-90",
        "label": "place_of_business",
        "synset": "place_of_business.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-office-91",
          "label": "office",
          "synset": "office.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-mercantile-establishment-92",
          "label": "mercantile_establishment",
          "synset": "mercantile_establishment.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-shop-93",
            "label": "shop",
            "synset": "shop.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-booth-94",
              "label": "booth",
              "synset": "booth.n.04",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-stall-95",
              "label": "stall",
              "synset": "stall.n.03",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "physical-institution-96",
        "label": "institution",
        "synset": "institution.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-penal-institution-97",
          "label": "penal_institution",
          "synset": "penal_institution.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-correctional-institution-98",
            "label": "correctional_institution",
            "synset": "correctional_institution.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-penitentiary-99",
              "label": "penitentiary",
              "synset": "penitentiary.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-supporting-structure-100",
      "label": "supporting_structure",
      "synset": "supporting_structure.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-skeleton-101",
        "label": "skeleton",
        "synset": "skeleton.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-framework-102",
        "label": "framework",
        "synset": "framework.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-scaffold-103",
          "label": "scaffold",
          "synset": "scaffold.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-derrick-104",
          "label": "derrick",
          "synset": "derrick.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-frame-105",
          "label": "frame",
          "synset": "frame.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-window-106",
          "label": "window",
          "synset": "window.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-skylight-107",
            "label": "skylight",
            "synset": "skylight.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-airframe-108",
          "label": "airframe",
          "synset": "airframe.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-mounting-109",
          "label": "mounting",
          "synset": "mounting.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-rack-110",
          "label": "rack",
          "synset": "rack.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-sash-111",
          "label": "sash",
          "synset": "sash.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-lattice-112",
          "label": "lattice",
          "synset": "lattice.n.03",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-trellis-113",
            "label": "trellis",
            "synset": "trellis.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-support-114",
        "label": "support",
        "synset": "support.n.07",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-foundation-115",
          "label": "foundation",
          "synset": "foundation.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-tower-116",
      "label": "tower",
      "synset": "tower.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-bridge-117",
      "label": "bridge",
      "synset": "bridge.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-drawbridge-118",
        "label": "drawbridge",
        "synset": "drawbridge.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-projection-119",
      "label": "projection",
      "synset": "projection.n.04",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-burr-120",
        "label": "burr",
        "synset": "burr.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-knob-121",
        "label": "knob",
        "synset": "knob.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-nailhead-122",
          "label": "nailhead",
          "synset": "nailhead.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-arm-123",
        "label": "arm",
        "synset": "arm.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-cleat-124",
        "label": "cleat",
        "synset": "cleat.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-flange-125",
        "label": "flange",
        "synset": "flange.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-tooth-126",
        "label": "tooth",
        "synset": "tooth.n.05",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-partition-127",
      "label": "partition",
      "synset": "partition.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-wall-128",
        "label": "wall",
        "synset": "wall.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-sidewall-129",
          "label": "sidewall",
          "synset": "sidewall.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-floor-130",
      "label": "floor",
      "synset": "floor.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-basement-131",
        "label": "basement",
        "synset": "basement.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-body-132",
      "label": "body",
      "synset": "body.n.11",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-masonry-133",
      "label": "masonry",
      "synset": "masonry.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-brickwork-134",
        "label": "brickwork",
        "synset": "brickwork.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-housing-135",
      "label": "housing",
      "synset": "housing.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-dwelling-136",
        "label": "dwelling",
        "synset": "dwelling.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-house-137",
          "label": "house",
          "synset": "house.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-cabin-138",
            "label": "cabin",
            "synset": "cabin.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-coil-139",
      "label": "coil",
      "synset": "coil.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-porch-140",
      "label": "porch",
      "synset": "porch.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-deck-141",
        "label": "deck",
        "synset": "deck.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-landing-142",
      "label": "landing",
      "synset": "landing.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-dock-143",
        "label": "dock",
        "synset": "dock.n.05",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-hull-144",
      "label": "hull",
      "synset": "hull.n.06",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-lamination-145",
      "label": "lamination",
      "synset": "lamination.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-laminate-146",
        "label": "laminate",
        "synset": "laminate.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-plywood-147",
          "label": "plywood",
          "synset": "plywood.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-shelter-148",
      "label": "shelter",
      "synset": "shelter.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-superstructure-149",
      "label": "superstructure",
      "synset": "superstructure.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-way-150",
      "label": "way",
      "synset": "way.n.06",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-passage-151",
        "label": "passage",
        "synset": "passage.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-conduit-152",
          "label": "conduit",
          "synset": "conduit.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-tube-153",
            "label": "tube",
            "synset": "tube.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-hose-154",
              "label": "hose",
              "synset": "hose.n.03",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-pipe-155",
              "label": "pipe",
              "synset": "pipe.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-pipeline-156",
              "label": "pipeline",
              "synset": "pipeline.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-drain-157",
              "label": "drain",
              "synset": "drain.n.03",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-sewer-158",
              "label": "sewer",
              "synset": "sewer.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-main-159",
              "label": "main",
              "synset": "main.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-catheter-160",
              "label": "catheter",
              "synset": "catheter.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-flue-161",
            "label": "flue",
            "synset": "flue.n.03",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-chimney-162",
              "label": "chimney",
              "synset": "chimney.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-duct-163",
            "label": "duct",
            "synset": "duct.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-channel-164",
          "label": "channel",
          "synset": "channel.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-gutter-165",
            "label": "gutter",
            "synset": "gutter.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-chute-166",
              "label": "chute",
              "synset": "chute.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-passageway-167",
          "label": "passageway",
          "synset": "passageway.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-aisle-168",
            "label": "aisle",
            "synset": "aisle.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-corridor-169",
            "label": "corridor",
            "synset": "corridor.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-hallway-170",
              "label": "hallway",
              "synset": "hallway.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-tunnel-171",
            "label": "tunnel",
            "synset": "tunnel.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-stairway-172",
        "label": "stairway",
        "synset": "stairway.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-stairs-173",
          "label": "stairs",
          "synset": "stairs.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-ladder-174",
            "label": "ladder",
            "synset": "ladder.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-escalator-175",
          "label": "escalator",
          "synset": "escalator.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-road-176",
        "label": "road",
        "synset": "road.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-highway-177",
          "label": "highway",
          "synset": "highway.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-roadway-178",
          "label": "roadway",
          "synset": "roadway.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-thoroughfare-179",
          "label": "thoroughfare",
          "synset": "thoroughfare.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-street-180",
            "label": "street",
            "synset": "street.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-track-181",
          "label": "track",
          "synset": "track.n.10",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-trail-182",
            "label": "trail",
            "synset": "trail.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-access-183",
        "label": "access",
        "synset": "access.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-entrance-184",
          "label": "entrance",
          "synset": "entrance.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-path-185",
        "label": "path",
        "synset": "path.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-walk-186",
          "label": "walk",
          "synset": "walk.n.05",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-facility-187",
      "label": "facility",
      "synset": "facility.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-public-toilet-188",
        "label": "public_toilet",
        "synset": "public_toilet.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-excavation-189",
    "label": "excavation",
    "synset": "excavation.n.03",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-ditch-190",
      "label": "ditch",
      "synset": "ditch.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-trench-191",
        "label": "trench",
        "synset": "trench.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-well-192",
      "label": "well",
      "synset": "well.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-mine-193",
      "label": "mine",
      "synset": "mine.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-barrier-194",
    "label": "barrier",
    "synset": "barrier.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-part-artifact-195",
    "label": "part (artifact)",
    "synset": "part.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-component-196",
    "label": "component",
    "synset": "component.n.03",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-hardware-197",
      "label": "hardware",
      "synset": "hardware.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-accessory-198",
      "label": "accessory",
      "synset": "accessory.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-fitting-199",
        "label": "fitting",
        "synset": "fitting.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-receptacle-200",
          "label": "receptacle",
          "synset": "receptacle.n.03",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-wall-socket-201",
            "label": "wall_socket",
            "synset": "wall_socket.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-addition-202",
      "label": "addition",
      "synset": "addition.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-attachment-203",
        "label": "attachment",
        "synset": "attachment.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-additive-204",
        "label": "additive",
        "synset": "additive.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-adjuvant-205",
          "label": "adjuvant",
          "synset": "adjuvant.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-module-206",
      "label": "module",
      "synset": "module.n.04",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-heating-element-207",
      "label": "heating_element",
      "synset": "heating_element.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-burner-208",
        "label": "burner",
        "synset": "burner.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-crystal-209",
      "label": "crystal",
      "synset": "crystal.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-ingredient-210",
      "label": "ingredient",
      "synset": "ingredient.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-input-211",
      "label": "input",
      "synset": "input.n.04",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-appendage-212",
    "label": "appendage",
    "synset": "appendage.n.03",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-handle-213",
      "label": "handle",
      "synset": "handle.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-knob-214",
        "label": "knob",
        "synset": "knob.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-section-215",
    "label": "section",
    "synset": "section.n.04",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-length-216",
      "label": "length",
      "synset": "length.n.05",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-piece-217",
    "label": "piece",
    "synset": "piece.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-beam-as-piece-218",
      "label": "beam_as_piece",
      "synset": "beam.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-timber-219",
        "label": "timber",
        "synset": "timber.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-piece-of-cloth-220",
      "label": "piece_of_cloth",
      "synset": "piece_of_cloth.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-patch-221",
        "label": "patch",
        "synset": "patch.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-towel-222",
        "label": "towel",
        "synset": "towel.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-piece-of-leather-223",
      "label": "piece_of_leather",
      "synset": "piece_of_leather.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-upper-224",
        "label": "upper",
        "synset": "upper.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-seat-225",
    "label": "seat",
    "synset": "seat.n.08",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-assembly-226",
    "label": "assembly",
    "synset": "assembly.n.05",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-article-227",
    "label": "article",
    "synset": "article.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-ware-228",
      "label": "ware",
      "synset": "ware.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-tableware-229",
        "label": "tableware",
        "synset": "tableware.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-glassware-230",
          "label": "glassware",
          "synset": "glassware.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-silverware-231",
          "label": "silverware",
          "synset": "silverware.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-cutlery-232",
          "label": "cutlery",
          "synset": "cutlery.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-service-233",
          "label": "service",
          "synset": "service.n.09",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-place-setting-234",
            "label": "place_setting",
            "synset": "place_setting.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "physical-insert-235",
    "label": "insert",
    "synset": "insert.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-layer-236",
    "label": "layer",
    "synset": "layer.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "physical-backing-237",
    "label": "backing",
    "synset": "backing.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-ply-238",
    "label": "ply",
    "synset": "ply.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-surface-239",
    "label": "surface",
    "synset": "surface.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-side-240",
      "label": "side",
      "synset": "side.n.05",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-edge-241",
        "label": "edge",
        "synset": "edge.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-bevel-242",
          "label": "bevel",
          "synset": "bevel.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-upper-surface-243",
        "label": "upper_surface",
        "synset": "upper_surface.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-ceiling-244",
          "label": "ceiling",
          "synset": "ceiling.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-horizontal-surface-245",
      "label": "horizontal_surface",
      "synset": "horizontal_surface.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-platform-246",
        "label": "platform",
        "synset": "platform.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-deck-247",
          "label": "deck",
          "synset": "deck.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-floor-248",
        "label": "floor",
        "synset": "floor.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-paved-surface-249",
        "label": "paved_surface",
        "synset": "paved_surface.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-pavement-250",
          "label": "pavement",
          "synset": "pavement.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-plaster-251",
      "label": "plaster",
      "synset": "plaster.n.04",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-screen-252",
      "label": "screen",
      "synset": "screen.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-tread-253",
      "label": "tread",
      "synset": "tread.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-strip-254",
    "label": "strip",
    "synset": "strip.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-band-255",
      "label": "band",
      "synset": "band.n.07",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-hoop-256",
        "label": "hoop",
        "synset": "hoop.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-tire-257",
          "label": "tire",
          "synset": "tire.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-rim-258",
          "label": "rim",
          "synset": "rim.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-tape-259",
      "label": "tape",
      "synset": "tape.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-ribbon-ink-260",
      "label": "ribbon (ink)]",
      "synset": "ribbon.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-ribbon-fabric-261",
      "label": "ribbon (fabric)",
      "synset": "ribbon.n.04",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-sheet-262",
    "label": "sheet",
    "synset": "sheet.n.06",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-panel-263",
      "label": "panel",
      "synset": "panel.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-paneling-264",
        "label": "paneling",
        "synset": "paneling.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-plate-265",
      "label": "plate",
      "synset": "plate.n.11",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-plate-glass-266",
      "label": "plate_glass",
      "synset": "plate_glass.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-slide-267",
        "label": "slide",
        "synset": "slide.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-pane-268",
        "label": "pane",
        "synset": "pane.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-stencil-269",
      "label": "stencil",
      "synset": "stencil.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-blank-270",
      "label": "blank",
      "synset": "blank.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-board-271",
      "label": "board",
      "synset": "board.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-wallboard-272",
        "label": "wallboard",
        "synset": "wallboard.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-fiberboard-273",
          "label": "fiberboard",
          "synset": "fiberboard.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-masonite-274",
            "label": "masonite",
            "synset": "masonite.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-membrane-275",
      "label": "membrane",
      "synset": "membrane.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-drumhead-276",
        "label": "drumhead",
        "synset": "drumhead.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-film-277",
      "label": "film",
      "synset": "film.n.05",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-sheet-metal-278",
      "label": "sheet_metal",
      "synset": "sheet_metal.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-flashing-279",
        "label": "flashing",
        "synset": "flashing.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-object-280",
    "label": "object",
    "synset": "object.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-keepsake-281",
    "label": "keepsake",
    "synset": "keepsake.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-property-282",
    "label": "property",
    "synset": "property.n.05",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-item-283",
    "label": "item",
    "synset": "item.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-creation-284",
    "label": "creation",
    "synset": "creation.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-representation-285",
      "label": "representation",
      "synset": "representation.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-photograph-286",
        "label": "photograph",
        "synset": "photograph.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-blueprint-287",
          "label": "blueprint",
          "synset": "blueprint.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-photographic-print-288",
          "label": "photographic_print",
          "synset": "photographic_print.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-frame-289",
          "label": "frame",
          "synset": "frame.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-photomicrograph-290",
          "label": "photomicrograph",
          "synset": "photomicrograph.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-radiogram-291",
          "label": "radiogram",
          "synset": "radiogram.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-scene-292",
          "label": "scene",
          "synset": "scene.n.04",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-drawing-293",
        "label": "drawing",
        "synset": "drawing.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-sketch-294",
          "label": "sketch",
          "synset": "sketch.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-diagram-295",
          "label": "diagram",
          "synset": "diagram.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-plan-296",
          "label": "plan",
          "synset": "plan.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-rendering-297",
          "label": "rendering",
          "synset": "rendering.n.06",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-tracing-298",
          "label": "tracing",
          "synset": "tracing.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-map-299",
        "label": "map",
        "synset": "map.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-chart-300",
          "label": "chart",
          "synset": "chart.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-picture-301",
        "label": "picture",
        "synset": "picture.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-graphic-302",
          "label": "graphic",
          "synset": "graphic.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-likeness-303",
          "label": "likeness",
          "synset": "likeness.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-foil-304",
          "label": "foil",
          "synset": "foil.n.04",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-slide-305",
            "label": "slide",
            "synset": "slide.n.06",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-sonogram-306",
          "label": "sonogram",
          "synset": "sonogram.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-model-307",
        "label": "model",
        "synset": "model.n.04",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-mock-up-308",
          "label": "mock-up",
          "synset": "mock-up.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-figure-309",
          "label": "figure",
          "synset": "figure.n.04",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-dummy-310",
            "label": "dummy",
            "synset": "dummy.n.03",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-mannequin-311",
              "label": "mannequin",
              "synset": "mannequin.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-puppet-312",
            "label": "puppet",
            "synset": "puppet.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-display-313",
        "label": "display",
        "synset": "display.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-copy-314",
        "label": "copy",
        "synset": "copy.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-duplicate-315",
          "label": "duplicate",
          "synset": "duplicate.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-backup-316",
            "label": "backup",
            "synset": "backup.n.04",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-cast-317",
          "label": "cast",
          "synset": "cast.n.06",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-photocopy-318",
          "label": "photocopy",
          "synset": "photocopy.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-stage-set-319",
        "label": "stage_set",
        "synset": "stage_set.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-scenery-320",
          "label": "scenery",
          "synset": "scenery.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-backdrop-321",
            "label": "backdrop",
            "synset": "backdrop.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-document-322",
        "label": "document",
        "synset": "document.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-illustration-323",
        "label": "illustration",
        "synset": "illustration.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-product-324",
      "label": "product",
      "synset": "product.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-work-325",
        "label": "work",
        "synset": "work.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-workpiece-326",
          "label": "workpiece",
          "synset": "workpiece.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-publication-327",
          "label": "publication",
          "synset": "publication.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-book-328",
            "label": "book",
            "synset": "book.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-reference-book-329",
              "label": "reference_book",
              "synset": "reference_book.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-handbook-330",
              "label": "handbook",
              "synset": "handbook.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-manual-331",
              "label": "manual",
              "synset": "manual.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-guidebook-332",
              "label": "guidebook",
              "synset": "guidebook.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-directory-333",
              "label": "directory",
              "synset": "directory.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-booklet-334",
              "label": "booklet",
              "synset": "booklet.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-textbook-335",
              "label": "textbook",
              "synset": "textbook.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-workbook-336",
              "label": "workbook",
              "synset": "workbook.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-periodical-337",
            "label": "periodical",
            "synset": "periodical.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-journal-338",
              "label": "journal",
              "synset": "journal.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-issue-339",
              "label": "issue",
              "synset": "issue.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-impression-340",
            "label": "impression",
            "synset": "impression.n.06",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-proof-341",
              "label": "proof",
              "synset": "proof.n.04",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-reference-342",
            "label": "reference",
            "synset": "reference.n.08",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-volume-343",
            "label": "volume",
            "synset": "volume.n.04",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-metalwork-344",
          "label": "metalwork",
          "synset": "metalwork.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-woodwork-345",
          "label": "woodwork",
          "synset": "woodwork.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-movie-346",
        "label": "movie",
        "synset": "movie.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-deliverable-347",
        "label": "deliverable",
        "synset": "deliverable.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-by-product-348",
        "label": "by-product",
        "synset": "by-product.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-book-349",
        "label": "book",
        "synset": "book.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-notebook-350",
          "label": "notebook",
          "synset": "notebook.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-end-product-351",
        "label": "end_product",
        "synset": "end_product.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-oeuvre-352",
          "label": "oeuvre",
          "synset": "oeuvre.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-piece-353",
      "label": "piece",
      "synset": "piece.n.06",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-article-354",
        "label": "article",
        "synset": "article.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-paper-355",
          "label": "paper",
          "synset": "paper.n.05",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-column-356",
          "label": "column",
          "synset": "column.n.05",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-invention-357",
      "label": "invention",
      "synset": "invention.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-needlework-358",
      "label": "needlework",
      "synset": "needlework.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-sewing-359",
        "label": "sewing",
        "synset": "sewing.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-applique-360",
          "label": "applique",
          "synset": "applique.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-binding-361",
          "label": "binding",
          "synset": "binding.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-stitch-362",
          "label": "stitch",
          "synset": "stitch.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-art-363",
      "label": "art",
      "synset": "art.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-dance-364",
        "label": "dance",
        "synset": "dance.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-graphic-art-365",
        "label": "graphic_art",
        "synset": "graphic_art.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-scene-366",
          "label": "scene",
          "synset": "scene.n.08",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-master-367",
      "label": "master",
      "synset": "master.n.06",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-commodity-368",
    "label": "commodity",
    "synset": "commodity.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-merchandise-369",
      "label": "merchandise",
      "synset": "merchandise.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-stock-370",
        "label": "stock",
        "synset": "stock.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-cargo-371",
        "label": "cargo",
        "synset": "cargo.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-contraband-372",
        "label": "contraband",
        "synset": "contraband.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-consumer-goods-373",
      "label": "consumer_goods",
      "synset": "consumer_goods.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-durables-374",
        "label": "durables",
        "synset": "durables.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-appliance-375",
          "label": "appliance",
          "synset": "appliance.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-dryer-376",
            "label": "dryer",
            "synset": "dryer.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-home-appliance-377",
            "label": "home_appliance",
            "synset": "home_appliance.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-iron-378",
              "label": "iron",
              "synset": "iron.n.04",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-kitchen-appliance-379",
              "label": "kitchen_appliance",
              "synset": "kitchen_appliance.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-oven-380",
              "label": "oven",
              "synset": "oven.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-white-goods-381",
              "label": "white_goods",
              "synset": "white_goods.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-refrigerator-382",
              "label": "refrigerator",
              "synset": "refrigerator.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-washer-383",
              "label": "washer",
              "synset": "washer.n.03",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "physical-clothing-384",
        "label": "clothing",
        "synset": "clothing.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-garment-385",
          "label": "garment",
          "synset": "garment.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-trouser-386",
            "label": "trouser",
            "synset": "trouser.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-shirt-387",
            "label": "shirt",
            "synset": "shirt.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-skirt-388",
            "label": "skirt",
            "synset": "skirt.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-diaper-389",
            "label": "diaper",
            "synset": "diaper.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-overgarment-390",
            "label": "overgarment",
            "synset": "overgarment.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-coat-391",
              "label": "coat",
              "synset": "coat.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-jacket-392",
              "label": "jacket",
              "synset": "jacket.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-laundry-393",
            "label": "laundry",
            "synset": "laundry.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-footwear-394",
          "label": "footwear",
          "synset": "footwear.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-hosiery-395",
            "label": "hosiery",
            "synset": "hosiery.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-stocking-396",
              "label": "stocking",
              "synset": "stocking.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-uniform-397",
          "label": "uniform",
          "synset": "uniform.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-apparel-398",
          "label": "apparel",
          "synset": "apparel.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-accessory-399",
          "label": "accessory",
          "synset": "accessory.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-handwear-400",
          "label": "handwear",
          "synset": "handwear.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-glove-401",
            "label": "glove",
            "synset": "glove.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-attire-402",
          "label": "attire",
          "synset": "attire.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-costume-403",
            "label": "costume",
            "synset": "costume.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-hairpiece-404",
            "label": "hairpiece",
            "synset": "hairpiece.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-wig-405",
              "label": "wig",
              "synset": "wig.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-drygoods-406",
      "label": "drygoods",
      "synset": "drygoods.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-white-goods-407",
        "label": "white_goods",
        "synset": "white_goods.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-linen-408",
          "label": "linen",
          "synset": "linen.n.03",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-table-linen-409",
            "label": "table_linen",
            "synset": "table_linen.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-napkin-410",
              "label": "napkin",
              "synset": "napkin.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-tablecloth-411",
              "label": "tablecloth",
              "synset": "tablecloth.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-future-412",
      "label": "future",
      "synset": "future.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-remains-413",
    "label": "remains",
    "synset": "remains.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-decoration-414",
    "label": "decoration",
    "synset": "decoration.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-design-415",
      "label": "design",
      "synset": "design.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-marking-416",
        "label": "marking",
        "synset": "marking.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-spot-417",
          "label": "spot",
          "synset": "spot.n.05",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-garnish-418",
      "label": "garnish",
      "synset": "garnish.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-topping-419",
        "label": "topping",
        "synset": "topping.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-glaze-420",
          "label": "glaze",
          "synset": "glaze.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-frosting-421",
          "label": "frosting",
          "synset": "frosting.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-adornment-422",
      "label": "adornment",
      "synset": "adornment.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-trimming-423",
        "label": "trimming",
        "synset": "trimming.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-jewelry-424",
        "label": "jewelry",
        "synset": "jewelry.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-jewel-425",
          "label": "jewel",
          "synset": "jewel.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-diamond-426",
            "label": "diamond",
            "synset": "diamond.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-flower-arrangement-427",
      "label": "flower_arrangement",
      "synset": "flower_arrangement.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-bouquet-428",
        "label": "bouquet",
        "synset": "bouquet.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-wreath-429",
        "label": "wreath",
        "synset": "wreath.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-molding-430",
      "label": "molding",
      "synset": "molding.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-block-431",
    "label": "block",
    "synset": "block.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-slab-432",
      "label": "slab",
      "synset": "slab.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-tile-433",
        "label": "tile",
        "synset": "tile.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-ingot-434",
      "label": "ingot",
      "synset": "ingot.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-building-material-435",
    "label": "building_material",
    "synset": "building_material.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-concrete-436",
      "label": "concrete",
      "synset": "concrete.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-cement-437",
      "label": "cement",
      "synset": "cement.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-insulating-material-438",
      "label": "insulating_material",
      "synset": "insulating_material.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-mortar-439",
      "label": "mortar",
      "synset": "mortar.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-covering-material-440",
      "label": "covering_material",
      "synset": "covering_material.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-plaster-441",
        "label": "plaster",
        "synset": "plaster.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-fiberglass-442",
        "label": "fiberglass",
        "synset": "fiberglass.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-linoleum-443",
        "label": "linoleum",
        "synset": "linoleum.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-lumber-444",
      "label": "lumber",
      "synset": "lumber.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-stock-445",
        "label": "stock",
        "synset": "stock.n.14",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-strip-446",
        "label": "strip",
        "synset": "strip.n.05",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-batten-447",
          "label": "batten",
          "synset": "batten.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-furring-strip-448",
          "label": "furring_strip",
          "synset": "furring_strip.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-slat-449",
          "label": "slat",
          "synset": "slat.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-lath-450",
            "label": "lath",
            "synset": "lath.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-brick-451",
      "label": "brick",
      "synset": "brick.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-flooring-452",
      "label": "flooring",
      "synset": "flooring.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-stone-453",
      "label": "stone",
      "synset": "stone.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-shingle-454",
      "label": "shingle",
      "synset": "shingle.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-siding-455",
      "label": "siding",
      "synset": "siding.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-roofing-material-456",
      "label": "roofing_material",
      "synset": "roofing_material.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-tile-457",
        "label": "tile",
        "synset": "tile.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-paving-458",
      "label": "paving",
      "synset": "paving.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-asphalt-459",
        "label": "asphalt",
        "synset": "asphalt.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-blacktop-460",
        "label": "blacktop",
        "synset": "blacktop.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-fabric-461",
    "label": "fabric",
    "synset": "fabric.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-net-462",
      "label": "net",
      "synset": "net.n.06",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-elastic-463",
      "label": "elastic",
      "synset": "elastic.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-felt-464",
      "label": "felt",
      "synset": "felt.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-lace-465",
      "label": "lace",
      "synset": "lace.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-webbing-466",
      "label": "webbing",
      "synset": "webbing.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-line-467",
    "label": "line",
    "synset": "line.n.18",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-rope-468",
      "label": "rope",
      "synset": "rope.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-cable-469",
        "label": "cable",
        "synset": "cable.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-cordage-470",
        "label": "cordage",
        "synset": "cordage.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-cord-471",
      "label": "cord",
      "synset": "cord.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-thread-472",
        "label": "thread",
        "synset": "thread.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-suture-473",
          "label": "suture",
          "synset": "suture.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-tie-474",
        "label": "tie",
        "synset": "tie.n.09",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-string-475",
        "label": "string",
        "synset": "string.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-padding-476",
    "label": "padding",
    "synset": "padding.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-cushion-477",
      "label": "cushion",
      "synset": "cushion.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-pillow-478",
        "label": "pillow",
        "synset": "pillow.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-pad-479",
      "label": "pad",
      "synset": "pad.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-mattress-480",
        "label": "mattress",
        "synset": "mattress.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-weight-481",
    "label": "weight",
    "synset": "weight.n.04",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-bob-482",
      "label": "bob",
      "synset": "bob.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-plumb-bob-483",
        "label": "plumb_bob",
        "synset": "plumb_bob.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-counterweight-484",
      "label": "counterweight",
      "synset": "counterweight.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-cone-485",
    "label": "cone",
    "synset": "cone.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-marker-486",
    "label": "marker",
    "synset": "marker.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-float-487",
    "label": "float",
    "synset": "float.n.06",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-raft-488",
      "label": "raft",
      "synset": "raft.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-restoration-489",
    "label": "restoration",
    "synset": "restoration.n.05",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-plaything-490",
    "label": "plaything",
    "synset": "plaything.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-covering-491",
    "label": "covering",
    "synset": "covering.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-coating-492",
      "label": "coating",
      "synset": "coating.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-paint-493",
        "label": "paint",
        "synset": "paint.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-enamel-494",
          "label": "enamel",
          "synset": "enamel.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-coat-of-paint-495",
        "label": "coat_of_paint",
        "synset": "coat_of_paint.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-flat-coat-496",
          "label": "flat_coat",
          "synset": "flat_coat.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-lacquer-497",
        "label": "lacquer",
        "synset": "lacquer.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-seal-498",
        "label": "seal",
        "synset": "seal.n.07",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-varnish-499",
        "label": "varnish",
        "synset": "varnish.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-cloth-covering-500",
      "label": "cloth_covering",
      "synset": "cloth_covering.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-dressing-501",
        "label": "dressing",
        "synset": "dressing.n.04",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-bandage-502",
          "label": "bandage",
          "synset": "bandage.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-cast-503",
            "label": "cast",
            "synset": "cast.n.05",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-sling-504",
            "label": "sling",
            "synset": "sling.n.05",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-compress-505",
          "label": "compress",
          "synset": "compress.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-bedclothes-506",
        "label": "bedclothes",
        "synset": "bedclothes.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-blanket-507",
          "label": "blanket",
          "synset": "blanket.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-protective-covering-508",
      "label": "protective_covering",
      "synset": "protective_covering.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-housing-509",
        "label": "housing",
        "synset": "housing.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-shell-510",
          "label": "shell",
          "synset": "shell.n.08",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-blind-511",
        "label": "blind",
        "synset": "blind.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-curtain-512",
          "label": "curtain",
          "synset": "curtain.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-lining-513",
        "label": "lining",
        "synset": "lining.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-roof-514",
        "label": "roof",
        "synset": "roof.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-screen-515",
        "label": "screen",
        "synset": "screen.n.05",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-windshield-516",
          "label": "windshield",
          "synset": "windshield.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-mask-517",
        "label": "mask",
        "synset": "mask.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-mulch-518",
        "label": "mulch",
        "synset": "mulch.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-shade-519",
        "label": "shade",
        "synset": "shade.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-shelter-520",
        "label": "shelter",
        "synset": "shelter.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-shield-521",
        "label": "shield",
        "synset": "shield.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-upholstery-522",
      "label": "upholstery",
      "synset": "upholstery.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-floor-cover-523",
      "label": "floor_cover",
      "synset": "floor_cover.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-rug-524",
        "label": "rug",
        "synset": "rug.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-mat-525",
        "label": "mat",
        "synset": "mat.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-footwear-526",
      "label": "footwear",
      "synset": "footwear.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-boot-527",
        "label": "boot",
        "synset": "boot.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-shoe-528",
        "label": "shoe",
        "synset": "shoe.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-top-529",
      "label": "top",
      "synset": "top.n.09",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-cap-530",
        "label": "cap",
        "synset": "cap.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-casing-531",
      "label": "casing",
      "synset": "casing.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-wrapping-532",
      "label": "wrapping",
      "synset": "wrapping.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-envelope-533",
        "label": "envelope",
        "synset": "envelope.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-flap-534",
      "label": "flap",
      "synset": "flap.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-folder-535",
      "label": "folder",
      "synset": "folder.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-instrumentality-536",
    "label": "instrumentality",
    "synset": "instrumentality.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-system-537",
    "label": "system",
    "synset": "system.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-scaffolding-538",
      "label": "scaffolding",
      "synset": "scaffolding.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-mechanical-system-539",
      "label": "mechanical_system",
      "synset": "mechanical_system.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-linkage-540",
        "label": "linkage",
        "synset": "linkage.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-network-541",
      "label": "network",
      "synset": "network.n.04",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-device-542",
    "label": "device",
    "synset": "device.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-mechanism-543",
      "label": "mechanism",
      "synset": "mechanism.n.05",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-control-544",
        "label": "control",
        "synset": "control.n.09",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-valve-545",
          "label": "valve",
          "synset": "valve.n.03",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-accelerator-546",
            "label": "accelerator",
            "synset": "accelerator.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-switch-547",
          "label": "switch",
          "synset": "switch.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-push-button-548",
            "label": "push_button",
            "synset": "push_button.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-commutator-549",
            "label": "commutator",
            "synset": "commutator.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-handwheel-550",
          "label": "handwheel",
          "synset": "handwheel.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-regulator-551",
          "label": "regulator",
          "synset": "regulator.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-thermostat-552",
            "label": "thermostat",
            "synset": "thermostat.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-aperture-553",
            "label": "aperture",
            "synset": "aperture.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-governor-554",
          "label": "governor",
          "synset": "governor.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-timer-555",
            "label": "timer",
            "synset": "timer.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-mechanical-device-556",
        "label": "mechanical_device",
        "synset": "mechanical_device.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-machine-557",
          "label": "machine",
          "synset": "machine.n.04",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-lever-558",
            "label": "lever",
            "synset": "lever.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-wheel-559",
            "label": "wheel",
            "synset": "wheel.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-gear-560",
              "label": "gear",
              "synset": "gear.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-inclined-plane-561",
            "label": "inclined_plane",
            "synset": "inclined_plane.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-wedge-562",
              "label": "wedge",
              "synset": "wedge.n.06",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-shim-563",
              "label": "shim",
              "synset": "shim.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-ramp-564",
              "label": "ramp",
              "synset": "ramp.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-pulley-565",
            "label": "pulley",
            "synset": "pulley.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-pump-566",
          "label": "pump",
          "synset": "pump.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-winder-567",
          "label": "winder",
          "synset": "winder.n.03",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-bobbin-568",
            "label": "bobbin",
            "synset": "bobbin.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-striker-569",
          "label": "striker",
          "synset": "striker.n.05",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-hammer-570",
            "label": "hammer",
            "synset": "hammer.n.06",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-head-571",
            "label": "head",
            "synset": "head.n.29",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-hook-572",
          "label": "hook",
          "synset": "hook.n.04",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-piston-573",
          "label": "piston",
          "synset": "piston.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-bumper-574",
          "label": "bumper",
          "synset": "bumper.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-carburetor-575",
          "label": "carburetor",
          "synset": "carburetor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-coupling-576",
          "label": "coupling",
          "synset": "coupling.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-clutch-577",
            "label": "clutch",
            "synset": "clutch.n.07",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-compressor-578",
          "label": "compressor",
          "synset": "compressor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-curler-579",
          "label": "curler",
          "synset": "curler.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-propeller-580",
          "label": "propeller",
          "synset": "propeller.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-ride-581",
          "label": "ride",
          "synset": "ride.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-splint-582",
          "label": "splint",
          "synset": "splint.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-broadcaster-583",
          "label": "broadcaster",
          "synset": "broadcaster.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-windshield-wiper-584",
          "label": "windshield_wiper",
          "synset": "windshield_wiper.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-automaton-585",
        "label": "automaton",
        "synset": "automaton.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-action-586",
        "label": "action",
        "synset": "action.n.07",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-actuator-587",
        "label": "actuator",
        "synset": "actuator.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-rotating-mechanism-588",
        "label": "rotating_mechanism",
        "synset": "rotating_mechanism.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-cam-589",
          "label": "cam",
          "synset": "cam.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-circle-590",
          "label": "circle",
          "synset": "circle.n.08",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-disk-591",
            "label": "disk",
            "synset": "disk.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-blade-592",
          "label": "blade",
          "synset": "blade.n.08",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-paddle-593",
            "label": "paddle",
            "synset": "paddle.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-gear-594",
        "label": "gear",
        "synset": "gear.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-transmission-595",
          "label": "transmission",
          "synset": "transmission.n.05",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-machine-596",
      "label": "machine",
      "synset": "machine.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-machinery-597",
        "label": "machinery",
        "synset": "machinery.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-mill-598",
          "label": "mill",
          "synset": "mill.n.04",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-motor-599",
        "label": "motor",
        "synset": "motor.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-engine-600",
          "label": "engine",
          "synset": "engine.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-generator-601",
            "label": "generator",
            "synset": "generator.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-heat-engine-602",
            "label": "heat_engine",
            "synset": "heat_engine.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-internal-combustion-engine-603",
              "label": "internal-combustion_engine",
              "synset": "internal-combustion_engine.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-rotary-engine-604",
              "label": "rotary_engine",
              "synset": "rotary_engine.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-turbine-605",
              "label": "turbine",
              "synset": "turbine.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-electric-motor-606",
          "label": "electric_motor",
          "synset": "electric_motor.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-starter-607",
            "label": "starter",
            "synset": "starter.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-computer-608",
        "label": "computer",
        "synset": "computer.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-web-site-609",
          "label": "web_site",
          "synset": "web_site.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-server-610",
          "label": "server",
          "synset": "server.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-digital-computer-611",
          "label": "digital_computer",
          "synset": "digital_computer.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-workstation-612",
            "label": "workstation",
            "synset": "workstation.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-press-613",
        "label": "press",
        "synset": "press.n.07",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-power-tool-614",
        "label": "power_tool",
        "synset": "power_tool.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-power-saw-615",
          "label": "power_saw",
          "synset": "power_saw.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-chain-saw-616",
            "label": "chain_saw",
            "synset": "chain_saw.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-assembly-617",
        "label": "assembly",
        "synset": "assembly.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-calculator-618",
        "label": "calculator",
        "synset": "calculator.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-counter-619",
          "label": "counter",
          "synset": "counter.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-machine-tool-620",
        "label": "machine_tool",
        "synset": "machine_tool.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-shaper-621",
          "label": "shaper",
          "synset": "shaper.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-lathe-622",
            "label": "lathe",
            "synset": "lathe.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-textile-machine-623",
        "label": "textile_machine",
        "synset": "textile_machine.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-loom-624",
          "label": "loom",
          "synset": "loom.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-printer-625",
        "label": "printer",
        "synset": "printer.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-printer-626",
          "label": "printer",
          "synset": "printer.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-character-printer-627",
          "label": "character_printer",
          "synset": "character_printer.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-typewriter-628",
            "label": "typewriter",
            "synset": "typewriter.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-instrument-629",
      "label": "instrument",
      "synset": "instrument.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-measuring-instrument-630",
        "label": "measuring_instrument",
        "synset": "measuring_instrument.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-gauge-631",
          "label": "gauge",
          "synset": "gauge.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-meter-632",
          "label": "meter",
          "synset": "meter.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-ammeter-633",
            "label": "ammeter",
            "synset": "ammeter.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-taximeter-634",
            "label": "taximeter",
            "synset": "taximeter.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-thermometer-635",
          "label": "thermometer",
          "synset": "thermometer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-timepiece-636",
          "label": "timepiece",
          "synset": "timepiece.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-clock-637",
            "label": "clock",
            "synset": "clock.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-scientific-instrument-638",
        "label": "scientific_instrument",
        "synset": "scientific_instrument.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-console-639",
          "label": "console",
          "synset": "console.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-magnifier-640",
          "label": "magnifier",
          "synset": "magnifier.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-microscope-641",
            "label": "microscope",
            "synset": "microscope.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-stroboscope-642",
          "label": "stroboscope",
          "synset": "stroboscope.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-weapon-643",
        "label": "weapon",
        "synset": "weapon.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-projectile-644",
          "label": "projectile",
          "synset": "projectile.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-bullet-645",
            "label": "bullet",
            "synset": "bullet.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-gun-646",
          "label": "gun",
          "synset": "gun.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-firearm-647",
            "label": "firearm",
            "synset": "firearm.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-optical-instrument-648",
        "label": "optical_instrument",
        "synset": "optical_instrument.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-projector-649",
          "label": "projector",
          "synset": "projector.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-medical-instrument-650",
        "label": "medical_instrument",
        "synset": "medical_instrument.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-surgical-instrument-651",
          "label": "surgical_instrument",
          "synset": "surgical_instrument.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-retractor-652",
            "label": "retractor",
            "synset": "retractor.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-electrical-device-653",
      "label": "electrical_device",
      "synset": "electrical_device.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-circuit-654",
        "label": "circuit",
        "synset": "circuit.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-wiring-655",
          "label": "wiring",
          "synset": "wiring.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-computer-circuit-656",
          "label": "computer_circuit",
          "synset": "computer_circuit.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-printed-circuit-657",
            "label": "printed_circuit",
            "synset": "printed_circuit.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-circuit-board-658",
              "label": "circuit_board",
              "synset": "circuit_board.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-link-659",
          "label": "link",
          "synset": "link.n.09",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-battery-660",
        "label": "battery",
        "synset": "battery.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-antenna-661",
        "label": "antenna",
        "synset": "antenna.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-control-panel-662",
        "label": "control_panel",
        "synset": "control_panel.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-relay-663",
        "label": "relay",
        "synset": "relay.n.05",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-fuse-664",
        "label": "fuse",
        "synset": "fuse.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-circuit-breaker-665",
          "label": "circuit_breaker",
          "synset": "circuit_breaker.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-cell-666",
        "label": "cell",
        "synset": "cell.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-distributor-667",
        "label": "distributor",
        "synset": "distributor.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-transducer-668",
        "label": "transducer",
        "synset": "transducer.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-electro-acoustic-transducer-669",
          "label": "electro-acoustic_transducer",
          "synset": "electro-acoustic_transducer.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-earphone-670",
            "label": "earphone",
            "synset": "earphone.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-loudspeaker-671",
            "label": "loudspeaker",
            "synset": "loudspeaker.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-spark-plug-672",
        "label": "spark_plug",
        "synset": "spark_plug.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-plug-673",
        "label": "plug",
        "synset": "plug.n.05",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-transformer-674",
        "label": "transformer",
        "synset": "transformer.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-conductor-675",
      "label": "conductor",
      "synset": "conductor.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-cable-676",
        "label": "cable",
        "synset": "cable.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-electrode-677",
        "label": "electrode",
        "synset": "electrode.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-wire-678",
        "label": "wire",
        "synset": "wire.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-jumper-cable-679",
          "label": "jumper_cable",
          "synset": "jumper_cable.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-lifting-device-680",
      "label": "lifting_device",
      "synset": "lifting_device.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-hoist-681",
        "label": "hoist",
        "synset": "hoist.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-crane-682",
        "label": "crane",
        "synset": "crane.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-winch-683",
        "label": "winch",
        "synset": "winch.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-elevator-684",
        "label": "elevator",
        "synset": "elevator.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-dumbwaiter-685",
          "label": "dumbwaiter",
          "synset": "dumbwaiter.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-restraint-686",
      "label": "restraint",
      "synset": "restraint.n.06",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-brake-687",
        "label": "brake",
        "synset": "brake.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-catch-688",
        "label": "catch",
        "synset": "catch.n.06",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-pawl-689",
          "label": "pawl",
          "synset": "pawl.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-fastener-690",
        "label": "fastener",
        "synset": "fastener.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-screw-691",
          "label": "screw",
          "synset": "screw.n.04",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-bolt-692",
            "label": "bolt",
            "synset": "bolt.n.06",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-setscrew-693",
            "label": "setscrew",
            "synset": "setscrew.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-button-694",
          "label": "button",
          "synset": "button.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-clip-695",
          "label": "clip",
          "synset": "clip.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-buckle-696",
          "label": "buckle",
          "synset": "buckle.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-seal-697",
          "label": "seal",
          "synset": "seal.n.08",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-gasket-698",
            "label": "gasket",
            "synset": "gasket.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-cringle-699",
          "label": "cringle",
          "synset": "cringle.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-lock-700",
          "label": "lock",
          "synset": "lock.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-nail-701",
          "label": "nail",
          "synset": "nail.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-staple-702",
            "label": "staple",
            "synset": "staple.n.04",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-tack-703",
            "label": "tack",
            "synset": "tack.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-pin-704",
          "label": "pin",
          "synset": "pin.n.09",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-rivet-705",
            "label": "rivet",
            "synset": "rivet.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-slide-fastener-706",
          "label": "slide_fastener",
          "synset": "slide_fastener.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-shackle-707",
        "label": "shackle",
        "synset": "shackle.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-handcuff-708",
          "label": "handcuff",
          "synset": "handcuff.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-lock-709",
        "label": "lock",
        "synset": "lock.n.05",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-safety-belt-710",
        "label": "safety_belt",
        "synset": "safety_belt.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-seat-belt-711",
          "label": "seat_belt",
          "synset": "seat_belt.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-indicator-712",
      "label": "indicator",
      "synset": "indicator.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-dial-713",
        "label": "dial",
        "synset": "dial.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-support-714",
      "label": "support",
      "synset": "support.n.10",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-shelf-715",
        "label": "shelf",
        "synset": "shelf.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-structural-member-716",
        "label": "structural_member",
        "synset": "structural_member.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-brace-717",
          "label": "brace",
          "synset": "brace.n.09",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-upright-718",
          "label": "upright",
          "synset": "upright.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-column-719",
            "label": "column",
            "synset": "column.n.07",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-pile-720",
              "label": "pile",
              "synset": "pile.n.06",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-post-721",
            "label": "post",
            "synset": "post.n.04",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-scantling-722",
            "label": "scantling",
            "synset": "scantling.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-beam-723",
          "label": "beam",
          "synset": "beam.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-girder-724",
            "label": "girder",
            "synset": "girder.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-sill-725",
          "label": "sill",
          "synset": "sill.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-bracket-726",
        "label": "bracket",
        "synset": "bracket.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-step-727",
        "label": "step",
        "synset": "step.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-base-728",
        "label": "base",
        "synset": "base.n.08",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-bearing-729",
        "label": "bearing",
        "synset": "bearing.n.06",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-brace-730",
        "label": "brace",
        "synset": "brace.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-bridge-731",
        "label": "bridge",
        "synset": "bridge.n.06",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-hanger-732",
        "label": "hanger",
        "synset": "hanger.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-rack-733",
        "label": "rack",
        "synset": "rack.n.05",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-seat-734",
        "label": "seat",
        "synset": "seat.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-source-of-illumination-735",
      "label": "source_of_illumination",
      "synset": "source_of_illumination.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-lamp-736",
        "label": "lamp",
        "synset": "lamp.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-electric-lamp-737",
          "label": "electric_lamp",
          "synset": "electric_lamp.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-light-bulb-738",
            "label": "light_bulb",
            "synset": "light_bulb.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-lantern-739",
          "label": "lantern",
          "synset": "lantern.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-light-740",
        "label": "light",
        "synset": "light.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-headlight-741",
          "label": "headlight",
          "synset": "headlight.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-filter-742",
      "label": "filter",
      "synset": "filter.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-jig-743",
      "label": "jig",
      "synset": "jig.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-electronic-device-744",
      "label": "electronic_device",
      "synset": "electronic_device.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-display-745",
        "label": "display",
        "synset": "display.n.06",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-screen-746",
          "label": "screen",
          "synset": "screen.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-display-panel-747",
          "label": "display_panel",
          "synset": "display_panel.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-monitor-748",
          "label": "monitor",
          "synset": "monitor.n.04",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-scanner-749",
        "label": "scanner",
        "synset": "scanner.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-tube-750",
        "label": "tube",
        "synset": "tube.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-holding-device-751",
      "label": "holding_device",
      "synset": "holding_device.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-clamp-752",
        "label": "clamp",
        "synset": "clamp.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-chuck-753",
        "label": "chuck",
        "synset": "chuck.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-holder-754",
        "label": "holder",
        "synset": "holder.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-memory-device-755",
      "label": "memory_device",
      "synset": "memory_device.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-magnetic-disk-756",
        "label": "magnetic_disk",
        "synset": "magnetic_disk.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-recording-757",
        "label": "recording",
        "synset": "recording.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-tape-758",
          "label": "tape",
          "synset": "tape.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-video-recording-759",
          "label": "video_recording",
          "synset": "video_recording.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-videotape-760",
            "label": "videotape",
            "synset": "videotape.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-sound-recording-761",
          "label": "sound_recording",
          "synset": "sound_recording.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-magnetic-tape-762",
        "label": "magnetic_tape",
        "synset": "magnetic_tape.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-videotape-763",
          "label": "videotape",
          "synset": "videotape.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-musical-instrument-764",
      "label": "musical_instrument",
      "synset": "musical_instrument.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-percussion-instrument-765",
        "label": "percussion_instrument",
        "synset": "percussion_instrument.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-piano-766",
          "label": "piano",
          "synset": "piano.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-optical-device-767",
      "label": "optical_device",
      "synset": "optical_device.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-lens-768",
        "label": "lens",
        "synset": "lens.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-laser-769",
        "label": "laser",
        "synset": "laser.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-corrective-770",
      "label": "corrective",
      "synset": "corrective.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-prosthesis-771",
        "label": "prosthesis",
        "synset": "prosthesis.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-implant-772",
          "label": "implant",
          "synset": "implant.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-detector-773",
      "label": "detector",
      "synset": "detector.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-elastic-device-774",
      "label": "elastic_device",
      "synset": "elastic_device.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-spring-775",
        "label": "spring",
        "synset": "spring.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-spiral-spring-776",
          "label": "spiral_spring",
          "synset": "spiral_spring.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-hairspring-777",
            "label": "hairspring",
            "synset": "hairspring.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-trap-778",
      "label": "trap",
      "synset": "trap.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-alarm-779",
      "label": "alarm",
      "synset": "alarm.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-applicator-780",
      "label": "applicator",
      "synset": "applicator.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-bait-781",
      "label": "bait",
      "synset": "bait.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-acoustic-device-782",
      "label": "acoustic_device",
      "synset": "acoustic_device.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-bell-783",
        "label": "bell",
        "synset": "bell.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-siren-784",
        "label": "siren",
        "synset": "siren.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-blower-785",
      "label": "blower",
      "synset": "blower.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-comb-786",
      "label": "comb",
      "synset": "comb.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-crusher-787",
      "label": "crusher",
      "synset": "crusher.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-dental-appliance-788",
      "label": "dental_appliance",
      "synset": "dental_appliance.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-denture-789",
        "label": "denture",
        "synset": "denture.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-flare-790",
      "label": "flare",
      "synset": "flare.n.09",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-lighter-791",
      "label": "lighter",
      "synset": "lighter.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-fuse-792",
        "label": "fuse",
        "synset": "fuse.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-heater-793",
      "label": "heater",
      "synset": "heater.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-converter-794",
      "label": "converter",
      "synset": "converter.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-electrical-converter-795",
        "label": "electrical_converter",
        "synset": "electrical_converter.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-inverter-796",
          "label": "inverter",
          "synset": "inverter.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-keyboard-797",
      "label": "keyboard",
      "synset": "keyboard.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-lift-798",
      "label": "lift",
      "synset": "lift.n.06",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-reflector-799",
      "label": "reflector",
      "synset": "reflector.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-mirror-800",
        "label": "mirror",
        "synset": "mirror.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-router-801",
      "label": "router",
      "synset": "router.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-airfoil-802",
      "label": "airfoil",
      "synset": "airfoil.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-spoiler-803",
        "label": "spoiler",
        "synset": "spoiler.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-strengthener-804",
      "label": "strengthener",
      "synset": "strengthener.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-brace-as-strengthener-805",
        "label": "brace_as_strengthener",
        "synset": "brace.n.09",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-tie-806",
          "label": "tie",
          "synset": "tie.n.08",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "physical-implement-807",
    "label": "implement",
    "synset": "implement.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-tool-808",
      "label": "tool",
      "synset": "tool.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-cutting-implement-809",
        "label": "cutting_implement",
        "synset": "cutting_implement.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-bit-810",
          "label": "bit",
          "synset": "bit.n.11",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-blade-811",
          "label": "blade",
          "synset": "blade.n.09",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-cutter-812",
          "label": "cutter",
          "synset": "cutter.n.06",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-edge-tool-813",
            "label": "edge_tool",
            "synset": "edge_tool.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-chisel-814",
              "label": "chisel",
              "synset": "chisel.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-knife-815",
              "label": "knife",
              "synset": "knife.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-scissors-816",
              "label": "scissors",
              "synset": "scissors.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-shear-817",
              "label": "shear",
              "synset": "shear.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "physical-jack-818",
        "label": "jack",
        "synset": "jack.n.10",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-drill-819",
        "label": "drill",
        "synset": "drill.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-auger-820",
          "label": "auger",
          "synset": "auger.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-hand-tool-821",
        "label": "hand_tool",
        "synset": "hand_tool.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-file-822",
          "label": "file",
          "synset": "file.n.04",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-saw-823",
          "label": "saw",
          "synset": "saw.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-scraper-824",
          "label": "scraper",
          "synset": "scraper.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-shovel-825",
          "label": "shovel",
          "synset": "shovel.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-wrench-826",
          "label": "wrench",
          "synset": "wrench.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-punch-827",
        "label": "punch",
        "synset": "punch.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-ram-828",
        "label": "ram",
        "synset": "ram.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-stylus-829",
        "label": "stylus",
        "synset": "stylus.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-bar-830",
      "label": "bar",
      "synset": "bar.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-lever-831",
        "label": "lever",
        "synset": "lever.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-pedal-832",
          "label": "pedal",
          "synset": "pedal.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-compound-lever-833",
          "label": "compound_lever",
          "synset": "compound_lever.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-scissors-as-lever-834",
            "label": "scissors_as_lever",
            "synset": "scissors.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-clipper-835",
              "label": "clipper",
              "synset": "clipper.n.04",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "physical-rail-836",
        "label": "rail",
        "synset": "rail.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-track-837",
        "label": "track",
        "synset": "track.n.09",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-utensil-838",
      "label": "utensil",
      "synset": "utensil.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-kitchen-utensil-839",
        "label": "kitchen_utensil",
        "synset": "kitchen_utensil.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-cooking-utensil-840",
          "label": "cooking_utensil",
          "synset": "cooking_utensil.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-pan-841",
            "label": "pan",
            "synset": "pan.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-ceramic-ware-842",
        "label": "ceramic_ware",
        "synset": "ceramic_ware.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-porcelain-843",
          "label": "porcelain",
          "synset": "porcelain.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-pottery-844",
          "label": "pottery",
          "synset": "pottery.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-rod-845",
      "label": "rod",
      "synset": "rod.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-pole-846",
        "label": "pole",
        "synset": "pole.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-rotating-shaft-847",
        "label": "rotating_shaft",
        "synset": "rotating_shaft.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-spindle-848",
          "label": "spindle",
          "synset": "spindle.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-shaft-849",
        "label": "shaft",
        "synset": "shaft.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-axle-850",
          "label": "axle",
          "synset": "axle.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-beater-851",
      "label": "beater",
      "synset": "beater.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-brush-852",
      "label": "brush",
      "synset": "brush.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-needle-853",
      "label": "needle",
      "synset": "needle.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-stick-854",
      "label": "stick",
      "synset": "stick.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-spindle-855",
        "label": "spindle",
        "synset": "spindle.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-cleaning-implement-856",
      "label": "cleaning_implement",
      "synset": "cleaning_implement.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-squeegee-857",
        "label": "squeegee",
        "synset": "squeegee.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-stick-858",
      "label": "stick",
      "synset": "stick.n.07",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-leather-strip-859",
      "label": "leather_strip",
      "synset": "leather_strip.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-strap-860",
        "label": "strap",
        "synset": "strap.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-conveyance-861",
    "label": "conveyance",
    "synset": "conveyance.n.03",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-vehicle-862",
      "label": "vehicle",
      "synset": "vehicle.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-craft-863",
        "label": "craft",
        "synset": "craft.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-aircraft-864",
          "label": "aircraft",
          "synset": "aircraft.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-heavier-than-air-craft-865",
            "label": "heavier-than-air_craft",
            "synset": "heavier-than-air_craft.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-airplane-866",
              "label": "airplane",
              "synset": "airplane.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-vessel-867",
          "label": "vessel",
          "synset": "vessel.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-boat-868",
            "label": "boat",
            "synset": "boat.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-barge-869",
              "label": "barge",
              "synset": "barge.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-sea-boat-870",
              "label": "sea_boat",
              "synset": "sea_boat.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-lifeboat-871",
              "label": "lifeboat",
              "synset": "lifeboat.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-tugboat-872",
              "label": "tugboat",
              "synset": "tugboat.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-ship-873",
            "label": "ship",
            "synset": "ship.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-wheeled-vehicle-874",
        "label": "wheeled_vehicle",
        "synset": "wheeled_vehicle.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-self-propelled-vehicle-875",
          "label": "self-propelled_vehicle",
          "synset": "self-propelled_vehicle.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-tractor-876",
            "label": "tractor",
            "synset": "tractor.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-bulldozer-877",
              "label": "bulldozer",
              "synset": "bulldozer.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-skidder-878",
              "label": "skidder",
              "synset": "skidder.n.03",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-locomotive-879",
            "label": "locomotive",
            "synset": "locomotive.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-dinky-880",
              "label": "dinky",
              "synset": "dinky.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-motor-vehicle-881",
            "label": "motor_vehicle",
            "synset": "motor_vehicle.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-truck-882",
              "label": "truck",
              "synset": "truck.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-van-883",
              "label": "van",
              "synset": "van.n.05",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-car-884",
              "label": "car",
              "synset": "car.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-ambulance-885",
              "label": "ambulance",
              "synset": "ambulance.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-limousine-886",
              "label": "limousine",
              "synset": "limousine.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-cab-887",
              "label": "cab",
              "synset": "cab.n.03",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-forklift-888",
            "label": "forklift",
            "synset": "forklift.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-carrier-889",
            "label": "carrier",
            "synset": "carrier.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-car-890",
          "label": "car",
          "synset": "car.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-freight-car-891",
            "label": "freight_car",
            "synset": "freight_car.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-flatcar-892",
              "label": "flatcar",
              "synset": "flatcar.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-handcart-893",
          "label": "handcart",
          "synset": "handcart.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-bicycle-894",
          "label": "bicycle",
          "synset": "bicycle.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-sled-895",
        "label": "sled",
        "synset": "sled.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-public-transport-896",
      "label": "public_transport",
      "synset": "public_transport.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-train-897",
        "label": "train",
        "synset": "train.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-bus-898",
        "label": "bus",
        "synset": "bus.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-litter-899",
      "label": "litter",
      "synset": "litter.n.03",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-stretcher-900",
        "label": "stretcher",
        "synset": "stretcher.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-trailer-901",
      "label": "trailer",
      "synset": "trailer.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-equipment-902",
    "label": "equipment",
    "synset": "equipment.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-electronic-equipment-903",
      "label": "electronic_equipment",
      "synset": "electronic_equipment.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-telephone-904",
        "label": "telephone",
        "synset": "telephone.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-circuitry-905",
        "label": "circuitry",
        "synset": "circuitry.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-set-906",
        "label": "set",
        "synset": "set.n.13",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-receiver-907",
          "label": "receiver",
          "synset": "receiver.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-radio-receiver-908",
            "label": "radio_receiver",
            "synset": "radio_receiver.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-transmitter-909",
          "label": "transmitter",
          "synset": "transmitter.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-television-equipment-910",
        "label": "television_equipment",
        "synset": "television_equipment.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-television-camera-911",
          "label": "television_camera",
          "synset": "television_camera.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-monitor-912",
        "label": "monitor",
        "synset": "monitor.n.05",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-terminal-913",
        "label": "terminal",
        "synset": "terminal.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-apparatus-914",
      "label": "apparatus",
      "synset": "apparatus.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-burner-915",
        "label": "burner",
        "synset": "burner.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-blowtorch-916",
          "label": "blowtorch",
          "synset": "blowtorch.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-centrifuge-917",
        "label": "centrifuge",
        "synset": "centrifuge.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-duplicator-918",
        "label": "duplicator",
        "synset": "duplicator.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-facsimile-919",
          "label": "facsimile",
          "synset": "facsimile.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-x-ray-machine-920",
        "label": "x-ray_machine",
        "synset": "x-ray_machine.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-fluoroscope-921",
          "label": "fluoroscope",
          "synset": "fluoroscope.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-lighting-922",
        "label": "lighting",
        "synset": "lighting.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-nuclear-reactor-923",
        "label": "nuclear_reactor",
        "synset": "nuclear_reactor.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-photographic-equipment-924",
      "label": "photographic_equipment",
      "synset": "photographic_equipment.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-camera-925",
        "label": "camera",
        "synset": "camera.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-photographic-paper-926",
        "label": "photographic_paper",
        "synset": "photographic_paper.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-film-927",
          "label": "film",
          "synset": "film.n.03",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-footage-928",
            "label": "footage",
            "synset": "footage.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-negative-929",
            "label": "negative",
            "synset": "negative.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-sequence-930",
            "label": "sequence",
            "synset": "sequence.n.03",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-reel-931",
            "label": "reel",
            "synset": "reel.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-game-equipment-932",
      "label": "game_equipment",
      "synset": "game_equipment.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-counter-933",
        "label": "counter",
        "synset": "counter.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-chip-934",
          "label": "chip",
          "synset": "chip.n.06",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-game-935",
        "label": "game",
        "synset": "game.n.09",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-puzzle-936",
          "label": "puzzle",
          "synset": "puzzle.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-gear-937",
      "label": "gear",
      "synset": "gear.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-kit-938",
        "label": "kit",
        "synset": "kit.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-rigging-939",
        "label": "rigging",
        "synset": "rigging.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-rig-940",
        "label": "rig",
        "synset": "rig.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-material-941",
      "label": "material",
      "synset": "material.n.04",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-packaging-942",
        "label": "packaging",
        "synset": "packaging.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-roofing-943",
        "label": "roofing",
        "synset": "roofing.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-recorder-944",
      "label": "recorder",
      "synset": "recorder.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-connection-945",
    "label": "connection",
    "synset": "connection.n.03",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-junction-946",
      "label": "junction",
      "synset": "junction.n.04",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-joint-947",
        "label": "joint",
        "synset": "joint.n.05",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-seam-948",
          "label": "seam",
          "synset": "seam.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-suture-949",
            "label": "suture",
            "synset": "suture.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-hinge-950",
          "label": "hinge",
          "synset": "hinge.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-miter-joint-951",
          "label": "miter_joint",
          "synset": "miter_joint.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-weld-952",
          "label": "weld",
          "synset": "weld.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-contact-953",
        "label": "contact",
        "synset": "contact.n.07",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-distributor-point-954",
          "label": "distributor_point",
          "synset": "distributor_point.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-terminal-955",
          "label": "terminal",
          "synset": "terminal.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-splice-956",
        "label": "splice",
        "synset": "splice.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-attachment-957",
      "label": "attachment",
      "synset": "attachment.n.04",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-ligament-958",
        "label": "ligament",
        "synset": "ligament.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-wire-959",
          "label": "wire",
          "synset": "wire.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-chain-960",
          "label": "chain",
          "synset": "chain.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-yoke-961",
      "label": "yoke",
      "synset": "yoke.n.06",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-container-962",
    "label": "container",
    "synset": "container.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-receptacle-963",
      "label": "receptacle",
      "synset": "receptacle.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-hopper-964",
        "label": "hopper",
        "synset": "hopper.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-tray-965",
        "label": "tray",
        "synset": "tray.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-ashtray-966",
        "label": "ashtray",
        "synset": "ashtray.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-trough-967",
        "label": "trough",
        "synset": "trough.n.05",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-vessel-968",
      "label": "vessel",
      "synset": "vessel.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-tank-969",
        "label": "tank",
        "synset": "tank.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-reservoir-970",
          "label": "reservoir",
          "synset": "reservoir.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-pot-971",
        "label": "pot",
        "synset": "pot.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-autoclave-972",
        "label": "autoclave",
        "synset": "autoclave.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-bedpan-973",
        "label": "bedpan",
        "synset": "bedpan.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-boiler-974",
        "label": "boiler",
        "synset": "boiler.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-bottle-975",
        "label": "bottle",
        "synset": "bottle.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-bowl-976",
        "label": "bowl",
        "synset": "bowl.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-bucket-977",
        "label": "bucket",
        "synset": "bucket.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-barrel-978",
        "label": "barrel",
        "synset": "barrel.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-keg-979",
          "label": "keg",
          "synset": "keg.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-ladle-980",
        "label": "ladle",
        "synset": "ladle.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-tub-981",
        "label": "tub",
        "synset": "tub.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-mold-982",
      "label": "mold",
      "synset": "mold.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-form-983",
        "label": "form",
        "synset": "form.n.16",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-box-984",
      "label": "box",
      "synset": "box.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-crate-985",
        "label": "crate",
        "synset": "crate.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-carton-986",
        "label": "carton",
        "synset": "carton.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-coffin-987",
        "label": "coffin",
        "synset": "coffin.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-strongbox-988",
        "label": "strongbox",
        "synset": "strongbox.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-cashbox-989",
          "label": "cashbox",
          "synset": "cashbox.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-cash-register-990",
            "label": "cash_register",
            "synset": "cash_register.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-safe-991",
          "label": "safe",
          "synset": "safe.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-dish-992",
      "label": "dish",
      "synset": "dish.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-case-993",
      "label": "case",
      "synset": "case.n.05",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-baggage-994",
        "label": "baggage",
        "synset": "baggage.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-trunk-995",
          "label": "trunk",
          "synset": "trunk.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-sleeve-996",
        "label": "sleeve",
        "synset": "sleeve.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-bag-997",
      "label": "bag",
      "synset": "bag.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-package-998",
      "label": "package",
      "synset": "package.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-bundle-999",
        "label": "bundle",
        "synset": "bundle.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-bale-1000",
          "label": "bale",
          "synset": "bale.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-case-1001",
      "label": "case",
      "synset": "case.n.20",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-drawer-1002",
      "label": "drawer",
      "synset": "drawer.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-glass-1003",
      "label": "glass",
      "synset": "glass.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-basket-1004",
      "label": "basket",
      "synset": "basket.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-bin-1005",
      "label": "bin",
      "synset": "bin.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-cylinder-1006",
      "label": "cylinder",
      "synset": "cylinder.n.04",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-dispenser-1007",
      "label": "dispenser",
      "synset": "dispenser.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-envelope-1008",
      "label": "envelope",
      "synset": "envelope.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-pan-1009",
      "label": "pan",
      "synset": "pan.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-wastepaper-basket-1010",
      "label": "wastepaper_basket",
      "synset": "wastepaper_basket.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-furnishing-1011",
    "label": "furnishing",
    "synset": "furnishing.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-furniture-1012",
      "label": "furniture",
      "synset": "furniture.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-table-1013",
        "label": "table",
        "synset": "table.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-bedroom-furniture-1014",
        "label": "bedroom_furniture",
        "synset": "bedroom_furniture.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-bed-1015",
          "label": "bed",
          "synset": "bed.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-seat-1016",
        "label": "seat",
        "synset": "seat.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-bench-1017",
          "label": "bench",
          "synset": "bench.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-chair-1018",
          "label": "chair",
          "synset": "chair.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-cabinet-1019",
        "label": "cabinet",
        "synset": "cabinet.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-baby-bed-1020",
        "label": "baby_bed",
        "synset": "baby_bed.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-crib-1021",
          "label": "crib",
          "synset": "crib.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-office-furniture-1022",
        "label": "office_furniture",
        "synset": "office_furniture.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-file-1023",
          "label": "file",
          "synset": "file.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "physical-toiletry-1024",
    "label": "toiletry",
    "synset": "toiletry.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-cosmetic-1025",
      "label": "cosmetic",
      "synset": "cosmetic.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-makeup-1026",
        "label": "makeup",
        "synset": "makeup.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-lotion-1027",
      "label": "lotion",
      "synset": "lotion.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-cream-1028",
      "label": "cream",
      "synset": "cream.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-hardware-1029",
    "label": "hardware",
    "synset": "hardware.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-matter-1030",
    "label": "matter",
    "synset": "matter.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-solid-1031",
    "label": "solid",
    "synset": "solid.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "physical-glass-1032",
    "label": "glass",
    "synset": "glass.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-crystal-1033",
    "label": "crystal",
    "synset": "crystal.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-gem-1034",
      "label": "gem",
      "synset": "gem.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-ice-1035",
      "label": "ice",
      "synset": "ice.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-frost-1036",
        "label": "frost",
        "synset": "frost.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-plastic-1037",
    "label": "plastic",
    "synset": "plastic.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-powder-1038",
    "label": "powder",
    "synset": "powder.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-fluid-1039",
    "label": "fluid",
    "synset": "fluid.n.02",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "physical-gas-1040",
    "label": "gas",
    "synset": "gas.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-air-1041",
      "label": "air",
      "synset": "air.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-oxygen-1042",
      "label": "oxygen",
      "synset": "oxygen.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-film-1043",
    "label": "film",
    "synset": "film.n.04",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-scum-1044",
      "label": "scum",
      "synset": "scum.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-slag-1045",
        "label": "slag",
        "synset": "slag.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-fragment-1046",
    "label": "fragment",
    "synset": "fragment.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-bit-1047",
    "label": "bit",
    "synset": "bit.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-ember-1048",
    "label": "ember",
    "synset": "ember.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-residue-1049",
    "label": "residue",
    "synset": "residue.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-ash-1050",
    "label": "ash",
    "synset": "ash.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-sediment-1051",
    "label": "sediment",
    "synset": "sediment.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-substance-1052",
    "label": "substance",
    "synset": "substance.n.07",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-chemical-agent-1053",
    "label": "chemical_agent",
    "synset": "chemical_agent.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-reagent-1054",
      "label": "reagent",
      "synset": "reagent.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-coolant-1055",
    "label": "coolant",
    "synset": "coolant.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-antifungal-1056",
    "label": "antifungal",
    "synset": "antifungal.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-drug-1057",
    "label": "drug",
    "synset": "drug.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-medicine-1058",
      "label": "medicine",
      "synset": "medicine.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-dose-1059",
        "label": "dose",
        "synset": "dose.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-antibacterial-1060",
        "label": "antibacterial",
        "synset": "antibacterial.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-antibiotic-1061",
          "label": "antibiotic",
          "synset": "antibiotic.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-antiseptic-1062",
        "label": "antiseptic",
        "synset": "antiseptic.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-pharmaceutical-1063",
        "label": "pharmaceutical",
        "synset": "pharmaceutical.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-radiopharmaceutical-1064",
          "label": "radiopharmaceutical",
          "synset": "radiopharmaceutical.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-prescription-drug-1065",
        "label": "prescription_drug",
        "synset": "prescription_drug.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-refill-1066",
          "label": "refill",
          "synset": "refill.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-sedative-1067",
        "label": "sedative",
        "synset": "sedative.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-tonic-1068",
        "label": "tonic",
        "synset": "tonic.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-anesthetic-1069",
      "label": "anesthetic",
      "synset": "anesthetic.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-drug-of-abuse-1070",
      "label": "drug_of_abuse",
      "synset": "drug_of_abuse.n.01",
      "virtual": true,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-food-1071",
    "label": "food",
    "synset": "food.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-foodstuff-1072",
      "label": "foodstuff",
      "synset": "foodstuff.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-ingredient-1073",
        "label": "ingredient",
        "synset": "ingredient.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-flavorer-1074",
          "label": "flavorer",
          "synset": "flavorer.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-condiment-1075",
            "label": "condiment",
            "synset": "condiment.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-sauce-1076",
              "label": "sauce",
              "synset": "sauce.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-dressing-1077",
              "label": "dressing",
              "synset": "dressing.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-relish-1078",
              "label": "relish",
              "synset": "relish.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "physical-concoction-1079",
        "label": "concoction",
        "synset": "concoction.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-dough-1080",
          "label": "dough",
          "synset": "dough.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-dairy-product-1081",
        "label": "dairy_product",
        "synset": "dairy_product.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-butter-1082",
          "label": "butter",
          "synset": "butter.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-flour-1083",
        "label": "flour",
        "synset": "flour.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-milk-1084",
        "label": "milk",
        "synset": "milk.n.04",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-formula-1085",
          "label": "formula",
          "synset": "formula.n.06",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-nutriment-1086",
      "label": "nutriment",
      "synset": "nutriment.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-meal-1087",
        "label": "meal",
        "synset": "meal.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-bite-1088",
          "label": "bite",
          "synset": "bite.n.04",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-refreshment-1089",
            "label": "refreshment",
            "synset": "refreshment.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-course-1090",
        "label": "course",
        "synset": "course.n.07",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-dessert-1091",
          "label": "dessert",
          "synset": "dessert.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-appetizer-1092",
          "label": "appetizer",
          "synset": "appetizer.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-dish-1093",
        "label": "dish",
        "synset": "dish.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-snack-food-1094",
          "label": "snack_food",
          "synset": "snack_food.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-sandwich-1095",
            "label": "sandwich",
            "synset": "sandwich.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-hamburger-1096",
              "label": "hamburger",
              "synset": "hamburger.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-soup-1097",
          "label": "soup",
          "synset": "soup.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-vitamin-1098",
        "label": "vitamin",
        "synset": "vitamin.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-meat-1099",
      "label": "meat",
      "synset": "meat.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-cut-1100",
        "label": "cut",
        "synset": "cut.n.06",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-roast-1101",
          "label": "roast",
          "synset": "roast.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-bird-1102",
        "label": "bird",
        "synset": "bird.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-poultry-1103",
          "label": "poultry",
          "synset": "poultry.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-baked-goods-1104",
      "label": "baked_goods",
      "synset": "baked_goods.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-bread-1105",
        "label": "bread",
        "synset": "bread.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-bun-1106",
          "label": "bun",
          "synset": "bun.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-pastry-1107",
        "label": "pastry",
        "synset": "pastry.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-cake-1108",
        "label": "cake",
        "synset": "cake.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-fish-1109",
      "label": "fish",
      "synset": "fish.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-seafood-1110",
      "label": "seafood",
      "synset": "seafood.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-shellfish-1111",
        "label": "shellfish",
        "synset": "shellfish.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-produce-1112",
      "label": "produce",
      "synset": "produce.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-vegetable-1113",
        "label": "vegetable",
        "synset": "vegetable.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-water-1114",
      "label": "water",
      "synset": "water.n.06",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-fare-1115",
      "label": "fare",
      "synset": "fare.n.04",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-diet-1116",
        "label": "diet",
        "synset": "diet.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-feed-1117",
      "label": "feed",
      "synset": "feed.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-beverage-1118",
      "label": "beverage",
      "synset": "beverage.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-tea-1119",
        "label": "tea",
        "synset": "tea.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-alcohol-1120",
        "label": "alcohol",
        "synset": "alcohol.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-brew-1121",
          "label": "brew",
          "synset": "brew.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-beer-1122",
            "label": "beer",
            "synset": "beer.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-liquor-1123",
          "label": "liquor",
          "synset": "liquor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-wine-1124",
          "label": "wine",
          "synset": "wine.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "physical-fuel-1125",
    "label": "fuel",
    "synset": "fuel.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-fossil-fuel-1126",
      "label": "fossil_fuel",
      "synset": "fossil_fuel.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-coal-1127",
        "label": "coal",
        "synset": "coal.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-firewood-1128",
      "label": "firewood",
      "synset": "firewood.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-lubricant-1129",
    "label": "lubricant",
    "synset": "lubricant.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-poison-1130",
    "label": "poison",
    "synset": "poison.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-refrigerant-1131",
    "label": "refrigerant",
    "synset": "refrigerant.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-antigen-1132",
    "label": "antigen",
    "synset": "antigen.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-immunogen-1133",
      "label": "immunogen",
      "synset": "immunogen.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-vaccine-1134",
        "label": "vaccine",
        "synset": "vaccine.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-lipid-1135",
    "label": "lipid",
    "synset": "lipid.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-oil-1136",
      "label": "oil",
      "synset": "oil.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-animal-oil-1137",
        "label": "animal_oil",
        "synset": "animal_oil.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-blubber-1138",
          "label": "blubber",
          "synset": "blubber.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-fat-1139",
      "label": "fat",
      "synset": "fat.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-natural-entities-1140",
    "label": "Natural Entities",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-natural-object-1141",
    "label": "natural_object",
    "synset": "natural_object.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "physical-sample-1142",
    "label": "sample",
    "synset": "sample.n.03",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-specimen-1143",
      "label": "specimen",
      "synset": "specimen.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-core-1144",
      "label": "core",
      "synset": "core.n.05",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-plant-part-1145",
    "label": "plant_part",
    "synset": "plant_part.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-stock-1146",
      "label": "stock",
      "synset": "stock.n.11",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-plant-organ-1147",
      "label": "plant_organ",
      "synset": "plant_organ.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-reproductive-structure-1148",
        "label": "reproductive_structure",
        "synset": "reproductive_structure.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-fruit-1149",
          "label": "fruit",
          "synset": "fruit.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-seed-1150",
            "label": "seed",
            "synset": "seed.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-grain-1151",
              "label": "grain",
              "synset": "grain.n.07",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-ovule-1152",
          "label": "ovule",
          "synset": "ovule.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-seed-1153",
            "label": "seed",
            "synset": "seed.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "physical-stalk-1154",
        "label": "stalk",
        "synset": "stalk.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-trunk-1155",
          "label": "trunk",
          "synset": "trunk.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-branch-1156",
          "label": "branch",
          "synset": "branch.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-limb-1157",
            "label": "limb",
            "synset": "limb.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-bulb-1158",
          "label": "bulb",
          "synset": "bulb.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-cutting-1159",
          "label": "cutting",
          "synset": "cutting.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-leaf-1160",
        "label": "leaf",
        "synset": "leaf.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-greenery-1161",
          "label": "greenery",
          "synset": "greenery.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-stump-1162",
      "label": "stump",
      "synset": "stump.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-covering-1163",
    "label": "covering",
    "synset": "covering.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "physical-body-covering-1164",
      "label": "body_covering",
      "synset": "body_covering.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-hair-1165",
        "label": "hair",
        "synset": "hair.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-facial-hair-1166",
          "label": "facial_hair",
          "synset": "facial_hair.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-beard-1167",
            "label": "beard",
            "synset": "beard.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-mustache-1168",
            "label": "mustache",
            "synset": "mustache.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-coat-1169",
          "label": "coat",
          "synset": "coat.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-eyebrow-1170",
          "label": "eyebrow",
          "synset": "eyebrow.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-eyelash-1171",
          "label": "eyelash",
          "synset": "eyelash.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-hide-1172",
        "label": "hide",
        "synset": "hide.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-skin-1173",
        "label": "skin",
        "synset": "skin.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "physical-cuticle-1174",
          "label": "cuticle",
          "synset": "cuticle.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-scalp-1175",
          "label": "scalp",
          "synset": "scalp.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "physical-blanket-1176",
      "label": "blanket",
      "synset": "blanket.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-body-1177",
    "label": "body",
    "synset": "body.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-rock-1178",
    "label": "rock",
    "synset": "rock.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-pebble-1179",
      "label": "pebble",
      "synset": "pebble.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "physical-geological-formation-1180",
    "label": "geological_formation",
    "synset": "geological_formation.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-natural-depression-1181",
      "label": "natural_depression",
      "synset": "natural_depression.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-bed-1182",
        "label": "bed",
        "synset": "bed.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-natural-elevation-1183",
      "label": "natural_elevation",
      "synset": "natural_elevation.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-ridge-1184",
        "label": "ridge",
        "synset": "ridge.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-ledge-1185",
          "label": "ledge",
          "synset": "ledge.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-berm-1186",
            "label": "berm",
            "synset": "berm.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "physical-body-of-water-1187",
    "label": "body_of_water",
    "synset": "body_of_water.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-lake-1188",
      "label": "lake",
      "synset": "lake.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "physical-pond-1189",
        "label": "pond",
        "synset": "pond.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-land-1190",
    "label": "land",
    "synset": "land.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "physical-living-thing-1191",
    "label": "living_thing",
    "synset": "living_thing.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "physical-organism-1192",
    "label": "organism",
    "synset": "organism.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "physical-animal-1193",
      "label": "animal",
      "synset": "animal.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-chordate-1194",
        "label": "chordate",
        "synset": "chordate.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-vertebrate-1195",
          "label": "vertebrate",
          "synset": "vertebrate.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-mammal-1196",
            "label": "mammal",
            "synset": "mammal.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-placental-1197",
              "label": "placental",
              "synset": "placental.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-livestock-1198",
              "label": "livestock",
              "synset": "livestock.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-carnivore-1199",
              "label": "carnivore",
              "synset": "carnivore.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-canine-1200",
              "label": "canine",
              "synset": "canine.n.02",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-dog-1201",
              "label": "dog",
              "synset": "dog.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-ungulate-1202",
              "label": "ungulate",
              "synset": "ungulate.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-odd-toed-ungulate-1203",
              "label": "odd-toed_ungulate",
              "synset": "odd-toed_ungulate.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-equine-1204",
              "label": "equine",
              "synset": "equine.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-horse-1205",
              "label": "horse",
              "synset": "horse.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-fetus-1206",
            "label": "fetus",
            "synset": "fetus.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-aquatic-vertebrate-1207",
            "label": "aquatic_vertebrate",
            "synset": "aquatic_vertebrate.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-fish-1208",
              "label": "fish",
              "synset": "fish.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-bird-1209",
            "label": "bird",
            "synset": "bird.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-gallinaceous-bird-1210",
              "label": "gallinaceous_bird",
              "synset": "gallinaceous_bird.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-domestic-fowl-1211",
              "label": "domestic_fowl",
              "synset": "domestic_fowl.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "physical-pest-1212",
        "label": "pest",
        "synset": "pest.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-prey-1213",
        "label": "prey",
        "synset": "prey.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-wildlife-1214",
        "label": "wildlife",
        "synset": "wildlife.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "physical-body-part-1215",
        "label": "body_part",
        "synset": "body_part.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-tissue-1216",
          "label": "tissue",
          "synset": "tissue.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-animal-tissue-1217",
            "label": "animal_tissue",
            "synset": "animal_tissue.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-gingiva-1218",
              "label": "gingiva",
              "synset": "gingiva.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-connective-tissue-1219",
              "label": "connective_tissue",
              "synset": "connective_tissue.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-bone-1220",
              "label": "bone",
              "synset": "bone.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-tooth-1221",
              "label": "tooth",
              "synset": "tooth.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-jaw-1222",
              "label": "jaw",
              "synset": "jaw.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-flesh-1223",
              "label": "flesh",
              "synset": "flesh.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-structure-1224",
          "label": "structure",
          "synset": "structure.n.04",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-filament-1225",
            "label": "filament",
            "synset": "filament.n.03",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-hair-1226",
              "label": "hair",
              "synset": "hair.n.04",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-horny-structure-1227",
            "label": "horny_structure",
            "synset": "horny_structure.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-nail-1228",
              "label": "nail",
              "synset": "nail.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-passage-1229",
            "label": "passage",
            "synset": "passage.n.07",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-duct-1230",
              "label": "duct",
              "synset": "duct.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-orifice-1231",
              "label": "orifice",
              "synset": "orifice.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-cartilaginous-structure-1232",
            "label": "cartilaginous_structure",
            "synset": "cartilaginous_structure.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-auricle-1233",
              "label": "auricle",
              "synset": "auricle.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-layer-1234",
            "label": "layer",
            "synset": "layer.n.05",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "physical-vascular-structure-1235",
            "label": "vascular_structure",
            "synset": "vascular_structure.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-pulp-1236",
              "label": "pulp",
              "synset": "pulp.n.05",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-tube-1237",
            "label": "tube",
            "synset": "tube.n.04",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-vessel-1238",
              "label": "vessel",
              "synset": "vessel.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-blood-vessel-1239",
              "label": "blood_vessel",
              "synset": "blood_vessel.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-vein-1240",
              "label": "vein",
              "synset": "vein.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-system-1241",
          "label": "system",
          "synset": "system.n.06",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-tract-1242",
            "label": "tract",
            "synset": "tract.n.02",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-respiratory-tract-1243",
              "label": "respiratory_tract",
              "synset": "respiratory_tract.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-muscular-structure-1244",
            "label": "muscular_structure",
            "synset": "muscular_structure.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-diaphragm-1245",
              "label": "diaphragm",
              "synset": "diaphragm.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "physical-area-1246",
          "label": "area",
          "synset": "area.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "physical-external-body-part-1247",
          "label": "external_body_part",
          "synset": "external_body_part.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-extremity-1248",
            "label": "extremity",
            "synset": "extremity.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-limb-1249",
              "label": "limb",
              "synset": "limb.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-arm-1250",
              "label": "arm",
              "synset": "arm.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-digit-1251",
              "label": "digit",
              "synset": "digit.n.03",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "physical-finger-1252",
              "label": "finger",
              "synset": "finger.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "physical-tail-1253",
              "label": "tail",
              "synset": "tail.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-neck-1254",
            "label": "neck",
            "synset": "neck.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-organ-1255",
          "label": "organ",
          "synset": "organ.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "physical-sense-organ-1256",
            "label": "sense_organ",
            "synset": "sense_organ.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-eye-1257",
              "label": "eye",
              "synset": "eye.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-internal-organ-1258",
            "label": "internal_organ",
            "synset": "internal_organ.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-viscera-1259",
              "label": "viscera",
              "synset": "viscera.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "physical-plant-1260",
      "label": "plant",
      "synset": "plant.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-vascular-plant-1261",
        "label": "vascular_plant",
        "synset": "vascular_plant.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "physical-woody-plant-1262",
          "label": "woody_plant",
          "synset": "woody_plant.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-tree-1263",
            "label": "tree",
            "synset": "tree.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "physical-sapling-1264",
              "label": "sapling",
              "synset": "sapling.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-shrub-1265",
            "label": "shrub",
            "synset": "shrub.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-spermatophyte-1266",
          "label": "spermatophyte",
          "synset": "spermatophyte.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-angiosperm-1267",
            "label": "angiosperm",
            "synset": "angiosperm.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-flower-1268",
              "label": "flower",
              "synset": "flower.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-seedling-1269",
            "label": "seedling",
            "synset": "seedling.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-herb-1270",
          "label": "herb",
          "synset": "herb.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "physical-gramineous-plant-1271",
            "label": "gramineous_plant",
            "synset": "gramineous_plant.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "physical-grass-1272",
              "label": "grass",
              "synset": "grass.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "physical-vegetable-1273",
            "label": "vegetable",
            "synset": "vegetable.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "physical-weed-1274",
          "label": "weed",
          "synset": "weed.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "physical-crop-1275",
        "label": "crop",
        "synset": "crop.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "physical-microorganism-1276",
      "label": "microorganism",
      "synset": "microorganism.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-parasite-1277",
      "label": "parasite",
      "synset": "parasite.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "physical-cell-1278",
      "label": "cell",
      "synset": "cell.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "physical-chromosome-1279",
        "label": "chromosome",
        "synset": "chromosome.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "physical-life-1280",
    "label": "life",
    "synset": "life.n.10",
    "virtual": false,
    "status": "none"
   }
  ]
 },
 "info": {
  "id": "info",
  "label": "Info",
  "synset": null,
  "virtual": false,
  "status": "none",
  "children": [
   {
    "id": "info-communication-1",
    "label": "Communication",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-written-communication-2",
    "label": "written_communication",
    "synset": "written_communication.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-writing-3",
    "label": "writing",
    "synset": "writing.n.04",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-coding-system-4",
      "label": "coding_system",
      "synset": "coding_system.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-code-5",
        "label": "code",
        "synset": "code.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-software-6",
          "label": "software",
          "synset": "software.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-program-7",
            "label": "program",
            "synset": "program.n.07",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-application-8",
              "label": "application",
              "synset": "application.n.04",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-patch-9",
              "label": "patch",
              "synset": "patch.n.05",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-software-documentation-10",
            "label": "software_documentation",
            "synset": "software_documentation.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-routine-11",
            "label": "routine",
            "synset": "routine.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-instruction-12",
          "label": "instruction",
          "synset": "instruction.n.04",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-link-13",
            "label": "link",
            "synset": "link.n.06",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "info-notation-14",
      "label": "notation",
      "synset": "notation.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-spelling-15",
      "label": "spelling",
      "synset": "spelling.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-correspondence-16",
    "label": "correspondence",
    "synset": "correspondence.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-code-17",
    "label": "code",
    "synset": "code.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-prescription-18",
    "label": "prescription",
    "synset": "prescription.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-transcription-19",
    "label": "transcription",
    "synset": "transcription.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-record-20",
    "label": "record",
    "synset": "record.n.07",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-ledger-21",
      "label": "ledger",
      "synset": "ledger.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-register-22",
      "label": "register",
      "synset": "register.n.03",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-accounting-23",
        "label": "accounting",
        "synset": "accounting.n.04",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-audited-account-24",
          "label": "audited_account",
          "synset": "audited_account.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-entry-25",
          "label": "entry",
          "synset": "entry.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-bond-26",
    "label": "bond",
    "synset": "bond.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-note-27",
    "label": "note",
    "synset": "note.n.09",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-paper-28",
    "label": "paper",
    "synset": "paper.n.04",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-magazine-29",
    "label": "magazine",
    "synset": "magazine.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-auditory-communication-30",
    "label": "auditory_communication",
    "synset": "auditory_communication.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-speech-31",
    "label": "speech",
    "synset": "speech.n.02",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-discussion-32",
      "label": "discussion",
      "synset": "discussion.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-consultation-33",
        "label": "consultation",
        "synset": "consultation.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-mediation-34",
        "label": "mediation",
        "synset": "mediation.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-dictation-35",
      "label": "dictation",
      "synset": "dictation.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-motto-36",
      "label": "motto",
      "synset": "motto.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-music-37",
    "label": "music",
    "synset": "music.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-musical-composition-38",
      "label": "musical_composition",
      "synset": "musical_composition.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-passage-39",
        "label": "passage",
        "synset": "passage.n.06",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-song-40",
        "label": "song",
        "synset": "song.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-score-41",
        "label": "score",
        "synset": "score.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-vocal-music-42",
      "label": "vocal_music",
      "synset": "vocal_music.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-part-43",
      "label": "part",
      "synset": "part.n.11",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-excerpt-44",
      "label": "excerpt",
      "synset": "excerpt.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-audio-45",
    "label": "audio",
    "synset": "audio.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-language-46",
    "label": "language",
    "synset": "language.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-telecommunication-47",
    "label": "telecommunication",
    "synset": "telecommunication.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-call-48",
      "label": "call",
      "synset": "call.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-visual-communication-49",
    "label": "visual_communication",
    "synset": "visual_communication.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-chart-50",
    "label": "chart",
    "synset": "chart.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-plot-51",
      "label": "plot",
      "synset": "plot.n.04",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-graph-52",
    "label": "graph",
    "synset": "graph.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-table-53",
    "label": "table",
    "synset": "table.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-presentation-54",
    "label": "presentation",
    "synset": "presentation.n.03",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-production-55",
      "label": "production",
      "synset": "production.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-demonstration-56",
      "label": "demonstration",
      "synset": "demonstration.n.05",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-display-57",
        "label": "display",
        "synset": "display.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-artwork-58",
    "label": "artwork",
    "synset": "artwork.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-illustration-59",
      "label": "illustration",
      "synset": "illustration.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-picture-60",
        "label": "picture",
        "synset": "picture.n.05",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-artwork-61",
    "label": "artwork",
    "synset": "artwork.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-film-62",
    "label": "film",
    "synset": "film.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-screening-63",
    "label": "screening",
    "synset": "screening.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-grimace-64",
    "label": "grimace",
    "synset": "grimace.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-signal-65",
    "label": "signal",
    "synset": "signal.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-symbol-66",
    "label": "symbol",
    "synset": "symbol.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-marker-67",
      "label": "marker",
      "synset": "marker.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-label-68",
        "label": "label",
        "synset": "label.n.04",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-tag-69",
          "label": "tag",
          "synset": "tag.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-trademark-70",
        "label": "trademark",
        "synset": "trademark.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-identifier-71",
      "label": "identifier",
      "synset": "identifier.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-postage-72",
      "label": "postage",
      "synset": "postage.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-alarm-73",
    "label": "alarm",
    "synset": "alarm.n.03",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-torpedo-74",
      "label": "torpedo",
      "synset": "torpedo.n.05",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-input-signal-75",
    "label": "input_signal",
    "synset": "input_signal.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-output-signal-76",
    "label": "output_signal",
    "synset": "output_signal.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-printout-77",
      "label": "printout",
      "synset": "printout.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-recording-78",
    "label": "recording",
    "synset": "recording.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-light-79",
    "label": "light",
    "synset": "light.n.14",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-traffic-light-80",
      "label": "traffic_light",
      "synset": "traffic_light.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-flag-81",
    "label": "flag",
    "synset": "flag.n.04",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-post-82",
    "label": "post",
    "synset": "post.n.09",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-sign-83",
    "label": "sign",
    "synset": "sign.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-poster-84",
    "label": "poster",
    "synset": "poster.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-message-85",
    "label": "message",
    "synset": "message.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-mail-86",
    "label": "mail",
    "synset": "mail.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-broadcast-87",
    "label": "broadcast",
    "synset": "broadcast.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-indication-88",
    "label": "indication",
    "synset": "indication.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-evidence-89",
    "label": "evidence",
    "synset": "evidence.n.02",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-identification-90",
      "label": "identification",
      "synset": "identification.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-positive-identification-91",
        "label": "positive_identification",
        "synset": "positive_identification.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-number-92",
          "label": "number",
          "synset": "number.n.08",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-card-93",
          "label": "card",
          "synset": "card.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-record-94",
      "label": "record",
      "synset": "record.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-history-95",
        "label": "history",
        "synset": "history.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-profile-96",
          "label": "profile",
          "synset": "profile.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-file-97",
        "label": "file",
        "synset": "file.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-text-file-98",
          "label": "text_file",
          "synset": "text_file.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-written-record-99",
        "label": "written_record",
        "synset": "written_record.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-log-100",
          "label": "log",
          "synset": "log.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-note-101",
          "label": "note",
          "synset": "note.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-memo-102",
            "label": "memo",
            "synset": "memo.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-entry-103",
          "label": "entry",
          "synset": "entry.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-transcript-104",
          "label": "transcript",
          "synset": "transcript.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-translation-105",
          "label": "translation",
          "synset": "translation.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-timeline-106",
          "label": "timeline",
          "synset": "timeline.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-argument-107",
      "label": "argument",
      "synset": "argument.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-case-108",
        "label": "case",
        "synset": "case.n.09",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-sign-109",
      "label": "sign",
      "synset": "sign.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-mark-110",
    "label": "mark",
    "synset": "mark.n.04",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-fingerprint-111",
      "label": "fingerprint",
      "synset": "fingerprint.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-guideline-112",
      "label": "guideline",
      "synset": "guideline.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-expressive-style-113",
    "label": "expressive_style",
    "synset": "expressive_style.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-jargon-114",
    "label": "jargon",
    "synset": "jargon.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-writing-style-115",
    "label": "writing_style",
    "synset": "writing_style.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-poetry-116",
      "label": "poetry",
      "synset": "poetry.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-prose-117",
      "label": "prose",
      "synset": "prose.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-attribute-118",
    "label": "Attribute",
    "synset": "attribute.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-arrangement-119",
    "label": "arrangement",
    "synset": "arrangement.n.02",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-classification-120",
    "label": "classification",
    "synset": "classification.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-series-121",
    "label": "series",
    "synset": "series.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-sequence-122",
      "label": "sequence",
      "synset": "sequence.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-chain-123",
      "label": "chain",
      "synset": "chain.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-relation-124",
    "label": "relation",
    "synset": "relation.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-part-125",
    "label": "part",
    "synset": "part.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-substance-126",
      "label": "substance",
      "synset": "substance.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-material-127",
        "label": "material",
        "synset": "material.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-waste-128",
          "label": "waste",
          "synset": "waste.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-rubbish-129",
            "label": "rubbish",
            "synset": "rubbish.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-debris-130",
              "label": "debris",
              "synset": "debris.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-litter-131",
              "label": "litter",
              "synset": "litter.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-impurity-132",
            "label": "impurity",
            "synset": "impurity.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-body-waste-133",
            "label": "body_waste",
            "synset": "body_waste.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "info-fecal-matter-134",
              "label": "fecal_matter",
              "synset": "fecal_matter.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-urine-135",
              "label": "urine",
              "synset": "urine.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-garbage-136",
            "label": "garbage",
            "synset": "garbage.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-chemical-137",
          "label": "chemical",
          "synset": "chemical.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-compound-138",
            "label": "compound",
            "synset": "compound.n.02",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-organic-compound-139",
              "label": "organic_compound",
              "synset": "organic_compound.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-macromolecule-140",
              "label": "macromolecule",
              "synset": "macromolecule.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-lipid-141",
              "label": "lipid",
              "synset": "lipid.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-oil-142",
              "label": "oil",
              "synset": "oil.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-petroleum-143",
              "label": "petroleum",
              "synset": "petroleum.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-wax-144",
              "label": "wax",
              "synset": "wax.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-protein-145",
              "label": "protein",
              "synset": "protein.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-resin-146",
              "label": "resin",
              "synset": "resin.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-pitch-147",
              "label": "pitch",
              "synset": "pitch.n.06",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-urethane-148",
              "label": "urethane",
              "synset": "urethane.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-acid-149",
              "label": "acid",
              "synset": "acid.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-oxide-150",
              "label": "oxide",
              "synset": "oxide.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-rust-151",
              "label": "rust",
              "synset": "rust.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-formulation-152",
              "label": "formulation",
              "synset": "formulation.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-polish-153",
              "label": "polish",
              "synset": "polish.n.03",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-detergent-154",
              "label": "detergent",
              "synset": "detergent.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-salt-155",
              "label": "salt",
              "synset": "salt.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-fluoride-156",
              "label": "fluoride",
              "synset": "fluoride.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-plaster-of-paris-157",
              "label": "plaster_of_paris",
              "synset": "plaster_of_paris.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-deoxyribonucleic-acid-158",
              "label": "deoxyribonucleic_acid",
              "synset": "deoxyribonucleic_acid.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-flux-159",
            "label": "flux",
            "synset": "flux.n.03",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-herbicide-160",
            "label": "herbicide",
            "synset": "herbicide.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-pesticide-161",
            "label": "pesticide",
            "synset": "pesticide.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-insecticide-162",
              "label": "insecticide",
              "synset": "insecticide.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-explosive-163",
            "label": "explosive",
            "synset": "explosive.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-charge-164",
              "label": "charge",
              "synset": "charge.n.15",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-fertilizer-165",
            "label": "fertilizer",
            "synset": "fertilizer.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-fumigant-166",
            "label": "fumigant",
            "synset": "fumigant.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-adhesive-material-167",
          "label": "adhesive_material",
          "synset": "adhesive_material.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-cement-168",
            "label": "cement",
            "synset": "cement.n.03",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-glue-169",
              "label": "glue",
              "synset": "glue.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-mastic-170",
              "label": "mastic",
              "synset": "mastic.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-paste-171",
            "label": "paste",
            "synset": "paste.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-paper-172",
          "label": "paper",
          "synset": "paper.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-sheet-173",
            "label": "sheet",
            "synset": "sheet.n.02",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-slip-174",
              "label": "slip",
              "synset": "slip.n.10",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-signature-175",
              "label": "signature",
              "synset": "signature.n.05",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-page-176",
              "label": "page",
              "synset": "page.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-card-177",
            "label": "card",
            "synset": "card.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-timecard-178",
            "label": "timecard",
            "synset": "timecard.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-earth-179",
          "label": "earth",
          "synset": "earth.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-soil-180",
            "label": "soil",
            "synset": "soil.n.02",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-clay-181",
              "label": "clay",
              "synset": "clay.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-sand-182",
              "label": "sand",
              "synset": "sand.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-topsoil-183",
              "label": "topsoil",
              "synset": "topsoil.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-mud-184",
              "label": "mud",
              "synset": "mud.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "info-rock-185",
          "label": "rock",
          "synset": "rock.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-gravel-186",
            "label": "gravel",
            "synset": "gravel.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-ballast-187",
              "label": "ballast",
              "synset": "ballast.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-marble-188",
            "label": "marble",
            "synset": "marble.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-granite-189",
            "label": "granite",
            "synset": "granite.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-plant-material-190",
          "label": "plant_material",
          "synset": "plant_material.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-wood-191",
            "label": "wood",
            "synset": "wood.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-log-192",
              "label": "log",
              "synset": "log.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-pulpwood-193",
              "label": "pulpwood",
              "synset": "pulpwood.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-tobacco-194",
            "label": "tobacco",
            "synset": "tobacco.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-sealing-material-195",
          "label": "sealing_material",
          "synset": "sealing_material.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-sealant-196",
            "label": "sealant",
            "synset": "sealant.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-caulk-197",
              "label": "caulk",
              "synset": "caulk.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-size-198",
            "label": "size",
            "synset": "size.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-abrasive-199",
          "label": "abrasive",
          "synset": "abrasive.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-emery-paper-200",
            "label": "emery_paper",
            "synset": "emery_paper.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-mineral-201",
          "label": "mineral",
          "synset": "mineral.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-asphalt-202",
            "label": "asphalt",
            "synset": "asphalt.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-asbestos-203",
            "label": "asbestos",
            "synset": "asbestos.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-insulator-204",
          "label": "insulator",
          "synset": "insulator.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-bushing-205",
            "label": "bushing",
            "synset": "bushing.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-fiber-206",
          "label": "fiber",
          "synset": "fiber.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-fibril-207",
            "label": "fibril",
            "synset": "fibril.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-cotton-208",
            "label": "cotton",
            "synset": "cotton.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-coloring-material-209",
          "label": "coloring_material",
          "synset": "coloring_material.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-dye-210",
            "label": "dye",
            "synset": "dye.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-pigment-211",
            "label": "pigment",
            "synset": "pigment.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-cement-212",
          "label": "cement",
          "synset": "cement.n.04",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-feedstock-213",
          "label": "feedstock",
          "synset": "feedstock.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-animal-skin-214",
          "label": "animal_skin",
          "synset": "animal_skin.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-hide-215",
            "label": "hide",
            "synset": "hide.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-fur-216",
            "label": "fur",
            "synset": "fur.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-rubber-217",
          "label": "rubber",
          "synset": "rubber.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-sponge-218",
          "label": "sponge",
          "synset": "sponge.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-mixture-219",
        "label": "mixture",
        "synset": "mixture.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-solution-220",
          "label": "solution",
          "synset": "solution.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-plaster-221",
          "label": "plaster",
          "synset": "plaster.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-grout-222",
            "label": "grout",
            "synset": "grout.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-alloy-223",
          "label": "alloy",
          "synset": "alloy.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-solder-224",
            "label": "solder",
            "synset": "solder.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-steel-225",
            "label": "steel",
            "synset": "steel.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-brass-226",
            "label": "brass",
            "synset": "brass.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-composition-227",
          "label": "composition",
          "synset": "composition.n.03",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-paste-228",
            "label": "paste",
            "synset": "paste.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-chemical-element-229",
        "label": "chemical_element",
        "synset": "chemical_element.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-metallic-element-230",
          "label": "metallic_element",
          "synset": "metallic_element.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-iron-231",
            "label": "iron",
            "synset": "iron.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-lead-232",
            "label": "lead",
            "synset": "lead.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-carbon-233",
          "label": "carbon",
          "synset": "carbon.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-diamond-234",
            "label": "diamond",
            "synset": "diamond.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-liquid-235",
        "label": "liquid",
        "synset": "liquid.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-beverage-236",
          "label": "beverage",
          "synset": "beverage.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-coffee-237",
            "label": "coffee",
            "synset": "coffee.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-alcohol-238",
          "label": "alcohol",
          "synset": "alcohol.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-ink-239",
          "label": "ink",
          "synset": "ink.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-liquid-body-substance-240",
        "label": "liquid_body_substance",
        "synset": "liquid_body_substance.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-blood-241",
          "label": "blood",
          "synset": "blood.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-semen-242",
          "label": "semen",
          "synset": "semen.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-serum-243",
          "label": "serum",
          "synset": "serum.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-plasma-244",
          "label": "plasma",
          "synset": "plasma.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-catalyst-245",
        "label": "catalyst",
        "synset": "catalyst.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-radioisotope-246",
        "label": "radioisotope",
        "synset": "radioisotope.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-solvent-247",
        "label": "solvent",
        "synset": "solvent.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-detail-248",
      "label": "detail",
      "synset": "detail.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-unit-249",
      "label": "unit",
      "synset": "unit.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-language-unit-250",
      "label": "language_unit",
      "synset": "language_unit.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-name-251",
        "label": "name",
        "synset": "name.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-signature-252",
          "label": "signature",
          "synset": "signature.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-title-253",
          "label": "title",
          "synset": "title.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-word-254",
        "label": "word",
        "synset": "word.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-form-255",
          "label": "form",
          "synset": "form.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-abbreviation-256",
            "label": "abbreviation",
            "synset": "abbreviation.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-homonym-257",
          "label": "homonym",
          "synset": "homonym.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-terminology-258",
          "label": "terminology",
          "synset": "terminology.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-member-259",
      "label": "member",
      "synset": "member.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-basis-260",
      "label": "basis",
      "synset": "basis.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-remainder-261",
      "label": "remainder",
      "synset": "remainder.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-leftover-262",
        "label": "leftover",
        "synset": "leftover.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-possession-263",
    "label": "possession",
    "synset": "possession.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-transferred-property-264",
      "label": "transferred_property",
      "synset": "transferred_property.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-outgo-265",
        "label": "outgo",
        "synset": "outgo.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-cost-266",
          "label": "cost",
          "synset": "cost.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-charge-267",
            "label": "charge",
            "synset": "charge.n.03",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-fixed-charge-268",
              "label": "fixed_charge",
              "synset": "fixed_charge.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-fee-269",
              "label": "fee",
              "synset": "fee.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-commission-270",
              "label": "commission",
              "synset": "commission.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-interest-271",
              "label": "interest",
              "synset": "interest.n.04",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-fare-272",
              "label": "fare",
              "synset": "fare.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-rate-273",
              "label": "rate",
              "synset": "rate.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-payment-274",
            "label": "payment",
            "synset": "payment.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-premium-275",
              "label": "premium",
              "synset": "premium.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-recompense-276",
              "label": "recompense",
              "synset": "recompense.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-allowance-277",
              "label": "allowance",
              "synset": "allowance.n.03",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-compensation-278",
              "label": "compensation",
              "synset": "compensation.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-allowance-279",
              "label": "allowance",
              "synset": "allowance.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-credit-280",
              "label": "credit",
              "synset": "credit.n.05",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-refund-281",
              "label": "refund",
              "synset": "refund.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-regular-payment-282",
              "label": "regular_payment",
              "synset": "regular_payment.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-wage-283",
              "label": "wage",
              "synset": "wage.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-rent-284",
              "label": "rent",
              "synset": "rent.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-repayment-285",
              "label": "repayment",
              "synset": "repayment.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-royalty-286",
              "label": "royalty",
              "synset": "royalty.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-fine-287",
              "label": "fine",
              "synset": "fine.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-price-288",
            "label": "price",
            "synset": "price.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-expense-289",
            "label": "expense",
            "synset": "expense.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-acquisition-290",
        "label": "acquisition",
        "synset": "acquisition.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-gift-291",
          "label": "gift",
          "synset": "gift.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-contribution-292",
            "label": "contribution",
            "synset": "contribution.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-jackpot-293",
            "label": "jackpot",
            "synset": "jackpot.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-purchase-294",
          "label": "purchase",
          "synset": "purchase.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-tax-write-off-295",
        "label": "tax_write-off",
        "synset": "tax_write-off.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-property-296",
      "label": "property",
      "synset": "property.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-wealth-297",
        "label": "wealth",
        "synset": "wealth.n.04",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-money-298",
          "label": "money",
          "synset": "money.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-real-property-299",
        "label": "real_property",
        "synset": "real_property.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-land-300",
          "label": "land",
          "synset": "land.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-estate-301",
          "label": "estate",
          "synset": "estate.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-assets-302",
      "label": "assets",
      "synset": "assets.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-sum-303",
        "label": "sum",
        "synset": "sum.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-coverage-304",
          "label": "coverage",
          "synset": "coverage.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-gross-305",
          "label": "gross",
          "synset": "gross.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-advance-306",
          "label": "advance",
          "synset": "advance.n.05",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-figure-307",
          "label": "figure",
          "synset": "figure.n.07",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-income-308",
          "label": "income",
          "synset": "income.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-dividend-309",
            "label": "dividend",
            "synset": "dividend.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-store-310",
            "label": "store",
            "synset": "store.n.02",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-infrastructure-311",
              "label": "infrastructure",
              "synset": "infrastructure.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-reserve-312",
            "label": "reserve",
            "synset": "reserve.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-investment-313",
        "label": "investment",
        "synset": "investment.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-stake-314",
          "label": "stake",
          "synset": "stake.n.04",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-resource-315",
        "label": "resource",
        "synset": "resource.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-support-316",
          "label": "support",
          "synset": "support.n.11",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-capital-317",
        "label": "capital",
        "synset": "capital.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-credit-318",
        "label": "credit",
        "synset": "credit.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-interest-319",
        "label": "interest",
        "synset": "interest.n.05",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-security-interest-320",
          "label": "security_interest",
          "synset": "security_interest.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-collateral-321",
            "label": "collateral",
            "synset": "collateral.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-reinsurance-322",
        "label": "reinsurance",
        "synset": "reinsurance.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-valuable-323",
        "label": "valuable",
        "synset": "valuable.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-liabilities-324",
      "label": "liabilities",
      "synset": "liabilities.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-tax-325",
        "label": "tax",
        "synset": "tax.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-duty-326",
          "label": "duty",
          "synset": "duty.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-assessment-327",
        "label": "assessment",
        "synset": "assessment.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-loan-328",
        "label": "loan",
        "synset": "loan.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-position-329",
    "label": "position",
    "synset": "position.n.07",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-placement-330",
      "label": "placement",
      "synset": "placement.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-spacing-331",
        "label": "spacing",
        "synset": "spacing.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-distance-332",
          "label": "distance",
          "synset": "distance.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-clearance-333",
            "label": "clearance",
            "synset": "clearance.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-altitude-334",
            "label": "altitude",
            "synset": "altitude.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-distribution-335",
          "label": "distribution",
          "synset": "distribution.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-alignment-336",
        "label": "alignment",
        "synset": "alignment.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-proportion-337",
        "label": "proportion",
        "synset": "proportion.n.05",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-direction-338",
      "label": "direction",
      "synset": "direction.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-orientation-339",
        "label": "orientation",
        "synset": "orientation.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-occlusion-340",
      "label": "occlusion",
      "synset": "occlusion.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-gradient-341",
      "label": "gradient",
      "synset": "gradient.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-seating-342",
      "label": "seating",
      "synset": "seating.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-change-343",
    "label": "change",
    "synset": "change.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-magnitude-relation-344",
    "label": "magnitude_relation",
    "synset": "magnitude_relation.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-rate-345",
      "label": "rate",
      "synset": "rate.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-flow-346",
        "label": "flow",
        "synset": "flow.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-speed-347",
        "label": "speed",
        "synset": "speed.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-frequency-348",
        "label": "frequency",
        "synset": "frequency.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-attendance-349",
          "label": "attendance",
          "synset": "attendance.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-station-350",
          "label": "station",
          "synset": "station.n.05",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-ratio-351",
      "label": "ratio",
      "synset": "ratio.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-efficiency-352",
        "label": "efficiency",
        "synset": "efficiency.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-content-353",
        "label": "content",
        "synset": "content.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-rate-354",
        "label": "rate",
        "synset": "rate.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-ownership-355",
    "label": "ownership",
    "synset": "ownership.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-partnership-356",
    "label": "partnership",
    "synset": "partnership.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-link-357",
    "label": "link",
    "synset": "link.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-state-358",
    "label": "state",
    "synset": "state.n.02",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-condition-359",
    "label": "condition",
    "synset": "condition.n.03",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-wellbeing-360",
      "label": "wellbeing",
      "synset": "wellbeing.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-being-361",
    "label": "being",
    "synset": "being.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-possibility-362",
      "label": "possibility",
      "synset": "possibility.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-opportunity-363",
        "label": "opportunity",
        "synset": "opportunity.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-potential-364",
        "label": "potential",
        "synset": "potential.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-relationship-365",
    "label": "relationship",
    "synset": "relationship.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-skillfulness-366",
    "label": "skillfulness",
    "synset": "skillfulness.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-expertness-367",
      "label": "expertness",
      "synset": "expertness.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-efficiency-368",
      "label": "efficiency",
      "synset": "efficiency.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-order-369",
    "label": "order",
    "synset": "order.n.03",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-agreement-370",
      "label": "agreement",
      "synset": "agreement.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-consensus-371",
        "label": "consensus",
        "synset": "consensus.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-imperfection-372",
    "label": "imperfection",
    "synset": "imperfection.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-defect-373",
      "label": "defect",
      "synset": "defect.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-failing-374",
      "label": "failing",
      "synset": "failing.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-situation-375",
    "label": "situation",
    "synset": "situation.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-environment-376",
      "label": "environment",
      "synset": "environment.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-sphere-377",
        "label": "sphere",
        "synset": "sphere.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-setting-378",
        "label": "setting",
        "synset": "setting.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-challenge-379",
      "label": "challenge",
      "synset": "challenge.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-picture-380",
      "label": "picture",
      "synset": "picture.n.04",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-operation-381",
      "label": "operation",
      "synset": "operation.n.08",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-status-382",
    "label": "status",
    "synset": "status.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-standing-383",
      "label": "standing",
      "synset": "standing.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-rating-384",
        "label": "rating",
        "synset": "rating.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-precedence-385",
      "label": "precedence",
      "synset": "precedence.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-grade-386",
      "label": "grade",
      "synset": "grade.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-relationship-387",
    "label": "relationship",
    "synset": "relationship.n.03",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-account-388",
      "label": "account",
      "synset": "account.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-membership-389",
      "label": "membership",
      "synset": "membership.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-affiliation-390",
      "label": "affiliation",
      "synset": "affiliation.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-company-391",
      "label": "company",
      "synset": "company.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-detention-392",
      "label": "detention",
      "synset": "detention.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-conflict-393",
    "label": "conflict",
    "synset": "conflict.n.04",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-degree-394",
    "label": "degree",
    "synset": "degree.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-extent-395",
      "label": "extent",
      "synset": "extent.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-feeling-396",
    "label": "feeling",
    "synset": "feeling.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-wish-397",
      "label": "wish",
      "synset": "wish.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-concern-398",
      "label": "concern",
      "synset": "concern.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-satisfaction-399",
      "label": "satisfaction",
      "synset": "satisfaction.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-comfort-400",
      "label": "comfort",
      "synset": "comfort.n.05",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-integrity-401",
    "label": "integrity",
    "synset": "integrity.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-completeness-402",
      "label": "completeness",
      "synset": "completeness.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-obligation-403",
    "label": "obligation",
    "synset": "obligation.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-indebtedness-404",
      "label": "indebtedness",
      "synset": "indebtedness.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-ownership-405",
    "label": "ownership",
    "synset": "ownership.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-readiness-406",
    "label": "readiness",
    "synset": "readiness.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-incident-407",
    "label": "incident",
    "synset": "incident.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-connection-408",
    "label": "connection",
    "synset": "connection.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-shadow-409",
    "label": "shadow",
    "synset": "shadow.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-phenomenon-410",
    "label": "phenomenon",
    "synset": "phenomenon.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-property-411",
    "label": "property",
    "synset": "property.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-magnitude-412",
    "label": "magnitude",
    "synset": "magnitude.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-dimension-413",
      "label": "dimension",
      "synset": "dimension.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-length-414",
        "label": "length",
        "synset": "length.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-diameter-415",
          "label": "diameter",
          "synset": "diameter.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-thickness-416",
        "label": "thickness",
        "synset": "thickness.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-height-417",
        "label": "height",
        "synset": "height.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-width-418",
        "label": "width",
        "synset": "width.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-size-419",
      "label": "size",
      "synset": "size.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-extent-420",
      "label": "extent",
      "synset": "extent.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-area-421",
        "label": "area",
        "synset": "area.n.06",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-space-422",
          "label": "space",
          "synset": "space.n.07",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-depth-423",
        "label": "depth",
        "synset": "depth.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-amount-424",
      "label": "amount",
      "synset": "amount.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-insufficiency-425",
        "label": "insufficiency",
        "synset": "insufficiency.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-deficit-426",
          "label": "deficit",
          "synset": "deficit.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-number-427",
        "label": "number",
        "synset": "number.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-increase-428",
        "label": "increase",
        "synset": "increase.n.04",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-supplement-429",
          "label": "supplement",
          "synset": "supplement.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-intensity-430",
      "label": "intensity",
      "synset": "intensity.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-degree-431",
    "label": "degree",
    "synset": "degree.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-quality-432",
      "label": "quality",
      "synset": "quality.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-characteristic-433",
    "label": "characteristic",
    "synset": "characteristic.n.04",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-temporal-property-434",
    "label": "temporal_property",
    "synset": "temporal_property.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-pace-435",
      "label": "pace",
      "synset": "pace.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-speed-436",
        "label": "speed",
        "synset": "speed.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-temporal-arrangement-437",
      "label": "temporal_arrangement",
      "synset": "temporal_arrangement.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-timing-438",
        "label": "timing",
        "synset": "timing.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-rotation-439",
        "label": "rotation",
        "synset": "rotation.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-duration-440",
      "label": "duration",
      "synset": "duration.n.03",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-lastingness-441",
        "label": "lastingness",
        "synset": "lastingness.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-constitution-442",
    "label": "constitution",
    "synset": "constitution.n.04",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-structure-443",
      "label": "structure",
      "synset": "structure.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-infrastructure-444",
        "label": "infrastructure",
        "synset": "infrastructure.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-physical-property-445",
    "label": "physical_property",
    "synset": "physical_property.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-weight-446",
      "label": "weight",
      "synset": "weight.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-luminosity-447",
      "label": "luminosity",
      "synset": "luminosity.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-sensitivity-448",
      "label": "sensitivity",
      "synset": "sensitivity.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-visual-property-449",
    "label": "visual_property",
    "synset": "visual_property.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-color-450",
      "label": "color",
      "synset": "color.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-shade-451",
        "label": "shade",
        "synset": "shade.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-light-452",
      "label": "light",
      "synset": "light.n.07",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-texture-453",
      "label": "texture",
      "synset": "texture.n.04",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-spatial-property-454",
    "label": "spatial_property",
    "synset": "spatial_property.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-shape-455",
      "label": "shape",
      "synset": "shape.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-curvature-456",
        "label": "curvature",
        "synset": "curvature.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-irregularity-457",
      "label": "irregularity",
      "synset": "irregularity.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-manner-458",
    "label": "manner",
    "synset": "manner.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-drape-459",
      "label": "drape",
      "synset": "drape.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-fit-460",
      "label": "fit",
      "synset": "fit.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-setup-461",
      "label": "setup",
      "synset": "setup.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-consistency-462",
    "label": "consistency",
    "synset": "consistency.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-viscosity-463",
      "label": "viscosity",
      "synset": "viscosity.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-fluidity-464",
      "label": "fluidity",
      "synset": "fluidity.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-bodily-property-465",
    "label": "bodily_property",
    "synset": "bodily_property.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-physiology-466",
      "label": "physiology",
      "synset": "physiology.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-pose-467",
      "label": "pose",
      "synset": "pose.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-sound-property-468",
    "label": "sound_property",
    "synset": "sound_property.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-pitch-469",
      "label": "pitch",
      "synset": "pitch.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-volume-470",
      "label": "volume",
      "synset": "volume.n.06",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-size-471",
    "label": "size",
    "synset": "size.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-strength-472",
    "label": "strength",
    "synset": "strength.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-sustainability-473",
    "label": "sustainability",
    "synset": "sustainability.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-tactile-property-474",
    "label": "tactile_property",
    "synset": "tactile_property.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-texture-475",
      "label": "texture",
      "synset": "texture.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-freshness-476",
    "label": "freshness",
    "synset": "freshness.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-quality-477",
    "label": "quality",
    "synset": "quality.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-characteristic-478",
    "label": "characteristic",
    "synset": "characteristic.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-aspect-479",
      "label": "aspect",
      "synset": "aspect.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-conformity-480",
      "label": "conformity",
      "synset": "conformity.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-power-481",
    "label": "power",
    "synset": "power.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-effectiveness-482",
      "label": "effectiveness",
      "synset": "effectiveness.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-efficacy-483",
        "label": "efficacy",
        "synset": "efficacy.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-control-484",
      "label": "control",
      "synset": "control.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-authority-485",
        "label": "authority",
        "synset": "authority.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-pressure-486",
      "label": "pressure",
      "synset": "pressure.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-appearance-487",
    "label": "appearance",
    "synset": "appearance.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-color-488",
      "label": "color",
      "synset": "color.n.08",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-blemish-489",
      "label": "blemish",
      "synset": "blemish.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-dent-490",
        "label": "dent",
        "synset": "dent.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-crack-491",
        "label": "crack",
        "synset": "crack.n.07",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-smudge-492",
        "label": "smudge",
        "synset": "smudge.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-mole-493",
        "label": "mole",
        "synset": "mole.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-scratch-494",
        "label": "scratch",
        "synset": "scratch.n.10",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-wart-495",
        "label": "wart",
        "synset": "wart.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-form-496",
      "label": "form",
      "synset": "form.n.07",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-look-497",
      "label": "look",
      "synset": "look.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-stain-498",
      "label": "stain",
      "synset": "stain.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-image-499",
      "label": "image",
      "synset": "image.n.08",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-coating-500",
      "label": "coating",
      "synset": "coating.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-glaze-501",
        "label": "glaze",
        "synset": "glaze.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-accuracy-502",
    "label": "accuracy",
    "synset": "accuracy.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-fidelity-503",
      "label": "fidelity",
      "synset": "fidelity.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-exactness-504",
      "label": "exactness",
      "synset": "exactness.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-preciseness-505",
        "label": "preciseness",
        "synset": "preciseness.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-trueness-506",
        "label": "trueness",
        "synset": "trueness.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-asset-507",
    "label": "asset",
    "synset": "asset.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-resource-508",
      "label": "resource",
      "synset": "resource.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-advantage-509",
      "label": "advantage",
      "synset": "advantage.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-handicap-510",
        "label": "handicap",
        "synset": "handicap.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-penalty-511",
          "label": "penalty",
          "synset": "penalty.n.04",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-forte-512",
      "label": "forte",
      "synset": "forte.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-ability-513",
    "label": "ability",
    "synset": "ability.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-capability-514",
      "label": "capability",
      "synset": "capability.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-adaptability-515",
      "label": "adaptability",
      "synset": "adaptability.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-competence-516",
      "label": "competence",
      "synset": "competence.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-utility-517",
    "label": "utility",
    "synset": "utility.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-practicability-518",
      "label": "practicability",
      "synset": "practicability.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-feasibility-519",
        "label": "feasibility",
        "synset": "feasibility.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-function-520",
      "label": "function",
      "synset": "function.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-practicality-521",
      "label": "practicality",
      "synset": "practicality.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-functionality-522",
        "label": "functionality",
        "synset": "functionality.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-viability-523",
        "label": "viability",
        "synset": "viability.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-serviceability-524",
      "label": "serviceability",
      "synset": "serviceability.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-suitability-525",
    "label": "suitability",
    "synset": "suitability.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-convenience-526",
      "label": "convenience",
      "synset": "convenience.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-handiness-527",
        "label": "handiness",
        "synset": "handiness.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-fitness-528",
      "label": "fitness",
      "synset": "fitness.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-qualification-529",
        "label": "qualification",
        "synset": "qualification.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-eligibility-530",
          "label": "eligibility",
          "synset": "eligibility.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-difference-531",
    "label": "difference",
    "synset": "difference.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-discrepancy-532",
      "label": "discrepancy",
      "synset": "discrepancy.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-allowance-533",
        "label": "allowance",
        "synset": "allowance.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-dissimilarity-534",
      "label": "dissimilarity",
      "synset": "dissimilarity.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-nonuniformity-535",
        "label": "nonuniformity",
        "synset": "nonuniformity.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-inconsistency-536",
          "label": "inconsistency",
          "synset": "inconsistency.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-nature-537",
    "label": "nature",
    "synset": "nature.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-sufficiency-538",
    "label": "sufficiency",
    "synset": "sufficiency.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-inaccuracy-539",
    "label": "inaccuracy",
    "synset": "inaccuracy.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-tone-540",
    "label": "tone",
    "synset": "tone.n.10",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-productiveness-541",
    "label": "productiveness",
    "synset": "productiveness.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-admissibility-542",
    "label": "admissibility",
    "synset": "admissibility.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-authenticity-543",
    "label": "authenticity",
    "synset": "authenticity.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-balance-544",
    "label": "balance",
    "synset": "balance.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-transparency-545",
    "label": "transparency",
    "synset": "transparency.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-distinctness-546",
    "label": "distinctness",
    "synset": "distinctness.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-focus-547",
      "label": "focus",
      "synset": "focus.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-value-548",
    "label": "value",
    "synset": "value.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-importance-549",
      "label": "importance",
      "synset": "importance.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-significance-550",
        "label": "significance",
        "synset": "significance.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-stability-551",
    "label": "stability",
    "synset": "stability.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-benefit-552",
    "label": "benefit",
    "synset": "benefit.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-advantage-553",
      "label": "advantage",
      "synset": "advantage.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-shape-554",
    "label": "shape",
    "synset": "shape.n.02",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-solid-555",
    "label": "solid",
    "synset": "solid.n.03",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-concave-shape-556",
      "label": "concave_shape",
      "synset": "concave_shape.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-depression-557",
        "label": "depression",
        "synset": "depression.n.08",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-crevice-558",
          "label": "crevice",
          "synset": "crevice.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-groove-559",
          "label": "groove",
          "synset": "groove.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-dimple-560",
          "label": "dimple",
          "synset": "dimple.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-cylinder-561",
      "label": "cylinder",
      "synset": "cylinder.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-roller-562",
        "label": "roller",
        "synset": "roller.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-roll-563",
        "label": "roll",
        "synset": "roll.n.11",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-polyhedron-564",
      "label": "polyhedron",
      "synset": "polyhedron.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-pyramid-565",
        "label": "pyramid",
        "synset": "pyramid.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-line-566",
    "label": "line",
    "synset": "line.n.04",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-curve-567",
      "label": "curve",
      "synset": "curve.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-boundary-568",
      "label": "boundary",
      "synset": "boundary.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-margin-569",
        "label": "margin",
        "synset": "margin.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-centerline-570",
      "label": "centerline",
      "synset": "centerline.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-amorphous-shape-571",
    "label": "amorphous_shape",
    "synset": "amorphous_shape.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-space-572",
      "label": "space",
      "synset": "space.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-opening-573",
        "label": "opening",
        "synset": "opening.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-hole-574",
          "label": "hole",
          "synset": "hole.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-leak-575",
            "label": "leak",
            "synset": "leak.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-crack-576",
          "label": "crack",
          "synset": "crack.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-rip-577",
          "label": "rip",
          "synset": "rip.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-compartment-578",
        "label": "compartment",
        "synset": "compartment.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-angle-579",
        "label": "angle",
        "synset": "angle.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-angular-distance-580",
          "label": "angular_distance",
          "synset": "angular_distance.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-latitude-581",
            "label": "latitude",
            "synset": "latitude.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-longitude-582",
            "label": "longitude",
            "synset": "longitude.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-figure-583",
    "label": "figure",
    "synset": "figure.n.06",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-plane-figure-584",
      "label": "plane_figure",
      "synset": "plane_figure.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-tree-585",
        "label": "tree",
        "synset": "tree.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-solid-figure-586",
      "label": "solid_figure",
      "synset": "solid_figure.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-sculpture-587",
        "label": "sculpture",
        "synset": "sculpture.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-statue-588",
          "label": "statue",
          "synset": "statue.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-round-shape-589",
    "label": "round_shape",
    "synset": "round_shape.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-sphere-590",
      "label": "sphere",
      "synset": "sphere.n.05",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-ball-591",
        "label": "ball",
        "synset": "ball.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-globule-592",
          "label": "globule",
          "synset": "globule.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-bubble-593",
            "label": "bubble",
            "synset": "bubble.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-foam-594",
              "label": "foam",
              "synset": "foam.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-soapsuds-595",
              "label": "soapsuds",
              "synset": "soapsuds.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "info-cylinder-596",
      "label": "cylinder",
      "synset": "cylinder.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-barrel-597",
        "label": "barrel",
        "synset": "barrel.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-brake-drum-598",
        "label": "brake_drum",
        "synset": "brake_drum.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-pipe-599",
        "label": "pipe",
        "synset": "pipe.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-column-600",
    "label": "column",
    "synset": "column.n.04",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-trait-601",
    "label": "trait",
    "synset": "trait.n.01",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-cleanliness-602",
    "label": "cleanliness",
    "synset": "cleanliness.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-individuality-603",
    "label": "individuality",
    "synset": "individuality.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-peculiarity-604",
      "label": "peculiarity",
      "synset": "peculiarity.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-idiosyncrasy-605",
        "label": "idiosyncrasy",
        "synset": "idiosyncrasy.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-time-606",
    "label": "time",
    "synset": "time.n.05",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-continuum-607",
    "label": "continuum",
    "synset": "continuum.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-history-608",
      "label": "history",
      "synset": "history.n.04",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-musical-time-609",
    "label": "musical_time",
    "synset": "musical_time.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-rhythm-610",
      "label": "rhythm",
      "synset": "rhythm.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-tempo-611",
      "label": "tempo",
      "synset": "tempo.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-measure-612",
    "label": "measure",
    "synset": "measure.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-indefinite-quantity-613",
    "label": "indefinite_quantity",
    "synset": "indefinite_quantity.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-supply-614",
      "label": "supply",
      "synset": "supply.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-load-615",
      "label": "load",
      "synset": "load.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-limit-616",
      "label": "limit",
      "synset": "limit.n.06",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-output-617",
      "label": "output",
      "synset": "output.n.04",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-catch-618",
      "label": "catch",
      "synset": "catch.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-correction-619",
      "label": "correction",
      "synset": "correction.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-dose-620",
      "label": "dose",
      "synset": "dose.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-addition-621",
      "label": "addition",
      "synset": "addition.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-run-622",
      "label": "run",
      "synset": "run.n.10",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-small-indefinite-quantity-623",
      "label": "small_indefinite_quantity",
      "synset": "small_indefinite_quantity.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-helping-624",
        "label": "helping",
        "synset": "helping.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-spot-625",
        "label": "spot",
        "synset": "spot.n.10",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-spillage-626",
      "label": "spillage",
      "synset": "spillage.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-fundamental-quantity-627",
    "label": "fundamental_quantity",
    "synset": "fundamental_quantity.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-time-period-628",
      "label": "time_period",
      "synset": "time_period.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-run-629",
        "label": "run",
        "synset": "run.n.08",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-time-630",
        "label": "time",
        "synset": "time.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-watch-631",
        "label": "watch",
        "synset": "watch.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-duration-632",
        "label": "duration",
        "synset": "duration.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-life-633",
        "label": "life",
        "synset": "life.n.05",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-phase-634",
        "label": "phase",
        "synset": "phase.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-work-time-635",
        "label": "work_time",
        "synset": "work_time.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-hours-636",
          "label": "hours",
          "synset": "hours.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-shift-637",
            "label": "shift",
            "synset": "shift.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "info-temperature-638",
      "label": "temperature",
      "synset": "temperature.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-length-639",
      "label": "length",
      "synset": "length.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-radius-640",
        "label": "radius",
        "synset": "radius.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-volume-641",
    "label": "volume",
    "synset": "volume.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-capacity-642",
      "label": "capacity",
      "synset": "capacity.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-count-643",
    "label": "count",
    "synset": "count.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-coordinate-644",
    "label": "coordinate",
    "synset": "coordinate.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-score-645",
    "label": "score",
    "synset": "score.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-time-unit-646",
    "label": "time_unit",
    "synset": "time_unit.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-day-647",
      "label": "day",
      "synset": "day.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-date-648",
        "label": "date",
        "synset": "date.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-hour-649",
      "label": "hour",
      "synset": "hour.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-value-650",
    "label": "value",
    "synset": "value.n.03",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-system-of-measurement-651",
    "label": "system_of_measurement",
    "synset": "system_of_measurement.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-standard-652",
      "label": "standard",
      "synset": "standard.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-medium-of-exchange-653",
        "label": "medium_of_exchange",
        "synset": "medium_of_exchange.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-currency-654",
          "label": "currency",
          "synset": "currency.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-cash-655",
            "label": "cash",
            "synset": "cash.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-change-656",
              "label": "change",
              "synset": "change.n.05",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-coinage-657",
            "label": "coinage",
            "synset": "coinage.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "info-coin-658",
              "label": "coin",
              "synset": "coin.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-money-659",
            "label": "money",
            "synset": "money.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-money-660",
          "label": "money",
          "synset": "money.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-fund-661",
            "label": "fund",
            "synset": "fund.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-deposit-662",
              "label": "deposit",
              "synset": "deposit.n.04",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-appropriation-663",
            "label": "appropriation",
            "synset": "appropriation.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-time-interval-664",
    "label": "time_interval",
    "synset": "time_interval.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-pause-665",
      "label": "pause",
      "synset": "pause.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-delay-666",
        "label": "delay",
        "synset": "delay.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-extension-667",
          "label": "extension",
          "synset": "extension.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-point-668",
    "label": "point",
    "synset": "point.n.06",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-deadline-669",
      "label": "deadline",
      "synset": "deadline.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-moment-670",
      "label": "moment",
      "synset": "moment.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-time-671",
        "label": "time",
        "synset": "time.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-unit-of-measurement-672",
    "label": "unit_of_measurement",
    "synset": "unit_of_measurement.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-electromagnetic-unit-673",
      "label": "electromagnetic_unit",
      "synset": "electromagnetic_unit.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-power-unit-674",
        "label": "power_unit",
        "synset": "power_unit.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-horsepower-675",
          "label": "horsepower",
          "synset": "horsepower.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-number-676",
    "label": "number",
    "synset": "number.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-base-677",
    "label": "base",
    "synset": "base.n.04",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-cognition-678",
    "label": "cognition",
    "synset": "cognition.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-information-679",
    "label": "information",
    "synset": "information.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-example-680",
      "label": "example",
      "synset": "example.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-sample-681",
        "label": "sample",
        "synset": "sample.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-exception-682",
        "label": "exception",
        "synset": "exception.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-datum-683",
      "label": "datum",
      "synset": "datum.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-reading-684",
        "label": "reading",
        "synset": "reading.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-clock-time-685",
          "label": "clock_time",
          "synset": "clock_time.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-hour-686",
            "label": "hour",
            "synset": "hour.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-statistic-687",
        "label": "statistic",
        "synset": "statistic.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-fact-688",
      "label": "fact",
      "synset": "fact.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-detail-689",
        "label": "detail",
        "synset": "detail.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-observation-690",
        "label": "observation",
        "synset": "observation.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-particular-691",
        "label": "particular",
        "synset": "particular.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-evidence-692",
      "label": "evidence",
      "synset": "evidence.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-sign-693",
        "label": "sign",
        "synset": "sign.n.06",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-vital-sign-694",
          "label": "vital_sign",
          "synset": "vital_sign.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-pulse-695",
            "label": "pulse",
            "synset": "pulse.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-symptom-696",
        "label": "symptom",
        "synset": "symptom.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-pain-697",
          "label": "pain",
          "synset": "pain.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-syndrome-698",
          "label": "syndrome",
          "synset": "syndrome.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-proof-699",
        "label": "proof",
        "synset": "proof.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-confirmation-700",
          "label": "confirmation",
          "synset": "confirmation.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-acquaintance-701",
      "label": "acquaintance",
      "synset": "acquaintance.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-circumstance-702",
      "label": "circumstance",
      "synset": "circumstance.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-stimulation-703",
      "label": "stimulation",
      "synset": "stimulation.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-discriminative-stimulus-704",
        "label": "discriminative_stimulus",
        "synset": "discriminative_stimulus.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-cognitive-factor-705",
    "label": "cognitive_factor",
    "synset": "cognitive_factor.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-determinant-706",
      "label": "determinant",
      "synset": "determinant.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-support-707",
        "label": "support",
        "synset": "support.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-difficulty-708",
      "label": "difficulty",
      "synset": "difficulty.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-trouble-709",
        "label": "trouble",
        "synset": "trouble.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-hindrance-710",
        "label": "hindrance",
        "synset": "hindrance.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-obstacle-711",
          "label": "obstacle",
          "synset": "obstacle.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-barrier-712",
            "label": "barrier",
            "synset": "barrier.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-ability-713",
    "label": "ability",
    "synset": "ability.n.02",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-know-how-714",
      "label": "know-how",
      "synset": "know-how.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-method-715",
        "label": "method",
        "synset": "method.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-system-716",
          "label": "system",
          "synset": "system.n.04",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-program-717",
            "label": "program",
            "synset": "program.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-discipline-718",
            "label": "discipline",
            "synset": "discipline.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-solution-719",
          "label": "solution",
          "synset": "solution.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-technique-720",
          "label": "technique",
          "synset": "technique.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-methodology-721",
          "label": "methodology",
          "synset": "methodology.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-confidentiality-722",
        "label": "confidentiality",
        "synset": "confidentiality.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-skill-723",
      "label": "skill",
      "synset": "skill.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-capacity-724",
      "label": "capacity",
      "synset": "capacity.n.08",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-capability-725",
      "label": "capability",
      "synset": "capability.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-fictional-character-726",
      "label": "fictional_character",
      "synset": "fictional_character.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-modality-727",
      "label": "modality",
      "synset": "modality.n.03",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-sight-728",
        "label": "sight",
        "synset": "sight.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-acuity-729",
          "label": "acuity",
          "synset": "acuity.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-hearing-730",
        "label": "hearing",
        "synset": "hearing.n.06",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-content-731",
    "label": "content",
    "synset": "content.n.05",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-idea-732",
      "label": "idea",
      "synset": "idea.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-plan-733",
        "label": "plan",
        "synset": "plan.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-plan-of-action-734",
          "label": "plan_of_action",
          "synset": "plan_of_action.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-scheme-735",
            "label": "scheme",
            "synset": "scheme.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-policy-736",
            "label": "policy",
            "synset": "policy.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-system-737",
            "label": "system",
            "synset": "system.n.07",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-travel-plan-738",
            "label": "travel_plan",
            "synset": "travel_plan.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-tactic-739",
            "label": "tactic",
            "synset": "tactic.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-budget-740",
          "label": "budget",
          "synset": "budget.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-project-741",
          "label": "project",
          "synset": "project.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-agenda-742",
          "label": "agenda",
          "synset": "agenda.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-blueprint-743",
          "label": "blueprint",
          "synset": "blueprint.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-outline-744",
          "label": "outline",
          "synset": "outline.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-regimen-745",
          "label": "regimen",
          "synset": "regimen.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-ideal-746",
        "label": "ideal",
        "synset": "ideal.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-criterion-747",
          "label": "criterion",
          "synset": "criterion.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-control-condition-748",
            "label": "control_condition",
            "synset": "control_condition.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-principle-749",
          "label": "principle",
          "synset": "principle.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-concept-750",
        "label": "concept",
        "synset": "concept.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-rule-751",
          "label": "rule",
          "synset": "rule.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-restriction-752",
            "label": "restriction",
            "synset": "restriction.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-part-753",
          "label": "part",
          "synset": "part.n.09",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-component-754",
            "label": "component",
            "synset": "component.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-hypothesis-755",
          "label": "hypothesis",
          "synset": "hypothesis.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-model-756",
            "label": "model",
            "synset": "model.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-assumption-757",
            "label": "assumption",
            "synset": "assumption.n.02",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "info-basis-758",
              "label": "basis",
              "synset": "basis.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "info-property-759",
          "label": "property",
          "synset": "property.n.04",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-feature-760",
            "label": "feature",
            "synset": "feature.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-quality-761",
            "label": "quality",
            "synset": "quality.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-law-762",
          "label": "law",
          "synset": "law.n.04",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-quantity-763",
          "label": "quantity",
          "synset": "quantity.n.03",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-subtotal-764",
            "label": "subtotal",
            "synset": "subtotal.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-value-765",
            "label": "value",
            "synset": "value.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-principle-766",
          "label": "principle",
          "synset": "principle.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-kind-767",
          "label": "kind",
          "synset": "kind.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-style-768",
            "label": "style",
            "synset": "style.n.03",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-type-769",
            "label": "type",
            "synset": "type.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-right-770",
          "label": "right",
          "synset": "right.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-access-771",
            "label": "access",
            "synset": "access.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-easement-772",
            "label": "easement",
            "synset": "easement.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-theme-773",
        "label": "theme",
        "synset": "theme.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-principle-774",
        "label": "principle",
        "synset": "principle.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-effect-775",
        "label": "effect",
        "synset": "effect.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-significance-776",
        "label": "significance",
        "synset": "significance.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-goal-777",
      "label": "goal",
      "synset": "goal.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-aim-778",
        "label": "aim",
        "synset": "aim.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-purpose-779",
        "label": "purpose",
        "synset": "purpose.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-topic-780",
      "label": "topic",
      "synset": "topic.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-area-781",
        "label": "area",
        "synset": "area.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-belief-782",
      "label": "belief",
      "synset": "belief.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-opinion-783",
        "label": "opinion",
        "synset": "opinion.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-judgment-784",
          "label": "judgment",
          "synset": "judgment.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-decision-785",
            "label": "decision",
            "synset": "decision.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-doctrine-786",
        "label": "doctrine",
        "synset": "doctrine.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-representation-787",
      "label": "representation",
      "synset": "representation.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-model-788",
        "label": "model",
        "synset": "model.n.07",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-template-789",
          "label": "template",
          "synset": "template.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-original-790",
          "label": "original",
          "synset": "original.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-interpretation-791",
        "label": "interpretation",
        "synset": "interpretation.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-view-792",
        "label": "view",
        "synset": "view.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-background-793",
          "label": "background",
          "synset": "background.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-profile-794",
          "label": "profile",
          "synset": "profile.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-issue-795",
      "label": "issue",
      "synset": "issue.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-experience-796",
      "label": "experience",
      "synset": "experience.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-tradition-797",
      "label": "tradition",
      "synset": "tradition.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-discipline-798",
      "label": "discipline",
      "synset": "discipline.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-engineering-799",
        "label": "engineering",
        "synset": "engineering.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-nanotechnology-800",
          "label": "nanotechnology",
          "synset": "nanotechnology.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-computer-science-801",
          "label": "computer_science",
          "synset": "computer_science.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-object-802",
            "label": "object",
            "synset": "object.n.05",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-artificial-intelligence-803",
            "label": "artificial_intelligence",
            "synset": "artificial_intelligence.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "info-robotics-804",
              "label": "robotics",
              "synset": "robotics.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "info-humanistic-discipline-805",
        "label": "humanistic_discipline",
        "synset": "humanistic_discipline.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-performing-arts-806",
          "label": "performing_arts",
          "synset": "performing_arts.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-acting-807",
            "label": "acting",
            "synset": "acting.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "info-portrayal-808",
              "label": "portrayal",
              "synset": "portrayal.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-character-809",
              "label": "character",
              "synset": "character.n.04",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-skit-810",
              "label": "skit",
              "synset": "skit.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         }
        ]
       },
       {
        "id": "info-science-811",
        "label": "science",
        "synset": "science.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-natural-science-812",
          "label": "natural_science",
          "synset": "natural_science.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-physics-813",
            "label": "physics",
            "synset": "physics.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "info-astronomy-814",
              "label": "astronomy",
              "synset": "astronomy.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-astrophysics-815",
              "label": "astrophysics",
              "synset": "astrophysics.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-chemistry-816",
            "label": "chemistry",
            "synset": "chemistry.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-earth-science-817",
            "label": "earth_science",
            "synset": "earth_science.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "info-geography-818",
              "label": "geography",
              "synset": "geography.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-life-science-819",
            "label": "life_science",
            "synset": "life_science.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "info-medical-science-820",
              "label": "medical_science",
              "synset": "medical_science.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-medicine-821",
              "label": "medicine",
              "synset": "medicine.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-prosthetics-822",
              "label": "prosthetics",
              "synset": "prosthetics.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "info-social-science-823",
          "label": "social_science",
          "synset": "social_science.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-sociology-824",
            "label": "sociology",
            "synset": "sociology.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     },
     {
      "id": "info-experience-825",
      "label": "experience",
      "synset": "experience.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-process-826",
    "label": "process",
    "synset": "process.n.02",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-higher-cognitive-process-827",
      "label": "higher_cognitive_process",
      "synset": "higher_cognitive_process.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-thinking-828",
        "label": "thinking",
        "synset": "thinking.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-reasoning-829",
          "label": "reasoning",
          "synset": "reasoning.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-analysis-830",
            "label": "analysis",
            "synset": "analysis.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-argumentation-831",
            "label": "argumentation",
            "synset": "argumentation.n.02",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-policy-832",
              "label": "policy",
              "synset": "policy.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-quota-833",
              "label": "quota",
              "synset": "quota.n.03",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "info-planning-834",
          "label": "planning",
          "synset": "planning.n.03",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-agreement-835",
            "label": "agreement",
            "synset": "agreement.n.04",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-prearrangement-836",
              "label": "prearrangement",
              "synset": "prearrangement.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "info-reservation-837",
              "label": "reservation",
              "synset": "reservation.n.06",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "info-problem-solving-838",
          "label": "problem_solving",
          "synset": "problem_solving.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-calculation-839",
            "label": "calculation",
            "synset": "calculation.n.02",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-estimate-840",
              "label": "estimate",
              "synset": "estimate.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-credit-rating-841",
              "label": "credit_rating",
              "synset": "credit_rating.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-inquiry-842",
            "label": "inquiry",
            "synset": "inquiry.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-poll-843",
              "label": "poll",
              "synset": "poll.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "info-trial-844",
              "label": "trial",
              "synset": "trial.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           }
          ]
         },
         {
          "id": "info-theory-845",
          "label": "theory",
          "synset": "theory.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-decision-making-846",
        "label": "decision_making",
        "synset": "decision_making.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-option-847",
          "label": "option",
          "synset": "option.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-settlement-848",
          "label": "settlement",
          "synset": "settlement.n.05",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-judgment-849",
          "label": "judgment",
          "synset": "judgment.n.04",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-knowing-850",
        "label": "knowing",
        "synset": "knowing.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-awareness-851",
          "label": "awareness",
          "synset": "awareness.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "info-understanding-852",
          "label": "understanding",
          "synset": "understanding.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-basic-cognitive-process-853",
      "label": "basic_cognitive_process",
      "synset": "basic_cognitive_process.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-perception-854",
        "label": "perception",
        "synset": "perception.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-somesthesia-855",
          "label": "somesthesia",
          "synset": "somesthesia.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-temperature-856",
            "label": "temperature",
            "synset": "temperature.n.02",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-pressure-857",
            "label": "pressure",
            "synset": "pressure.n.05",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-sensation-858",
          "label": "sensation",
          "synset": "sensation.n.01",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-taste-859",
            "label": "taste",
            "synset": "taste.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "info-relish-860",
              "label": "relish",
              "synset": "relish.n.03",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "info-dub-861",
            "label": "dub",
            "synset": "dub.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-appraisal-862",
        "label": "appraisal",
        "synset": "appraisal.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-evaluation-863",
          "label": "evaluation",
          "synset": "evaluation.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-mark-864",
            "label": "mark",
            "synset": "mark.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "info-pricing-865",
            "label": "pricing",
            "synset": "pricing.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       },
       {
        "id": "info-symbol-866",
        "label": "symbol",
        "synset": "symbol.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-badge-867",
          "label": "badge",
          "synset": "badge.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-identity-868",
        "label": "identity",
        "synset": "identity.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-vogue-869",
        "label": "vogue",
        "synset": "vogue.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-structure-870",
    "label": "structure",
    "synset": "structure.n.03",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-form-871",
      "label": "form",
      "synset": "form.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-grid-872",
        "label": "grid",
        "synset": "grid.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-design-873",
      "label": "design",
      "synset": "design.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-layout-874",
        "label": "layout",
        "synset": "layout.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-configuration-875",
        "label": "configuration",
        "synset": "configuration.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-attitude-876",
    "label": "attitude",
    "synset": "attitude.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-position-877",
      "label": "position",
      "synset": "position.n.03",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-level-878",
    "label": "level",
    "synset": "level.n.07",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-substitute-879",
    "label": "substitute",
    "synset": "substitute.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-inefficiency-880",
    "label": "inefficiency",
    "synset": "inefficiency.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-motivation-881",
    "label": "motivation",
    "synset": "motivation.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-incentive-882",
    "label": "incentive",
    "synset": "incentive.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-location-883",
    "label": "Location",
    "synset": "location.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-line-884",
    "label": "line",
    "synset": "line.n.11",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-path-885",
    "label": "path",
    "synset": "path.n.04",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-point-886",
    "label": "point",
    "synset": "point.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-position-887",
    "label": "position",
    "synset": "position.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-beginning-888",
    "label": "beginning",
    "synset": "beginning.n.04",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-topographic-point-889",
    "label": "topographic_point",
    "synset": "topographic_point.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-stop-890",
      "label": "stop",
      "synset": "stop.n.05",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-geographic-point-891",
    "label": "geographic_point",
    "synset": "geographic_point.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-address-892",
      "label": "address",
      "synset": "address.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-residence-893",
        "label": "residence",
        "synset": "residence.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-home-894",
          "label": "home",
          "synset": "home.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "info-workplace-895",
      "label": "workplace",
      "synset": "workplace.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-lab-896",
        "label": "lab",
        "synset": "lab.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-location-897",
        "label": "location",
        "synset": "location.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-central-898",
        "label": "central",
        "synset": "central.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-switchboard-899",
          "label": "switchboard",
          "synset": "switchboard.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-corner-900",
    "label": "corner",
    "synset": "corner.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-region-901",
    "label": "region",
    "synset": "region.n.03",
    "virtual": true,
    "status": "none"
   },
   {
    "id": "info-geographical-area-902",
    "label": "geographical_area",
    "synset": "geographical_area.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "info-tract-903",
      "label": "tract",
      "synset": "tract.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-site-904",
        "label": "site",
        "synset": "site.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-cemetery-905",
          "label": "cemetery",
          "synset": "cemetery.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-field-906",
        "label": "field",
        "synset": "field.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "info-lawn-907",
          "label": "lawn",
          "synset": "lawn.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-plot-908",
        "label": "plot",
        "synset": "plot.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-garden-909",
          "label": "garden",
          "synset": "garden.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "info-landscaping-910",
            "label": "landscaping",
            "synset": "landscaping.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "info-bed-911",
          "label": "bed",
          "synset": "bed.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "info-park-912",
        "label": "park",
        "synset": "park.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-range-913",
        "label": "range",
        "synset": "range.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-yard-914",
        "label": "yard",
        "synset": "yard.n.07",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-environment-915",
      "label": "environment",
      "synset": "environment.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-habitat-916",
        "label": "habitat",
        "synset": "habitat.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-setting-917",
        "label": "setting",
        "synset": "setting.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-area-918",
    "label": "area",
    "synset": "area.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-scene-919",
      "label": "scene",
      "synset": "scene.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-venue-920",
        "label": "venue",
        "synset": "venue.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-space-921",
      "label": "space",
      "synset": "space.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-section-922",
      "label": "section",
      "synset": "section.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "info-vicinity-923",
        "label": "vicinity",
        "synset": "vicinity.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "info-scenery-924",
          "label": "scenery",
          "synset": "scenery.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "info-landscape-925",
            "label": "landscape",
            "synset": "landscape.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "info-space-926",
    "label": "space",
    "synset": "space.n.02",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-opening-927",
    "label": "opening",
    "synset": "opening.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-hole-928",
      "label": "hole",
      "synset": "hole.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-leak-929",
        "label": "leak",
        "synset": "leak.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "info-crack-930",
      "label": "crack",
      "synset": "crack.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "info-rip-931",
      "label": "rip",
      "synset": "rip.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "info-compartment-932",
    "label": "compartment",
    "synset": "compartment.n.01",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "info-angle-933",
    "label": "angle",
    "synset": "angle.n.01",
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "info-angular-distance-934",
      "label": "angular_distance",
      "synset": "angular_distance.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "info-latitude-935",
        "label": "latitude",
        "synset": "latitude.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "info-longitude-936",
        "label": "longitude",
        "synset": "longitude.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "info-base-937",
    "label": "base",
    "synset": "base.n.14",
    "virtual": false,
    "status": "none"
   }
  ]
 },
 "actor": {
  "id": "actor",
  "label": "Actor",
  "synset": null,
  "virtual": false,
  "status": "none",
  "children": [
   {
    "id": "actor-what-kind-1",
    "label": "[What kind?]",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-1-human-2",
    "label": "1. Human",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-1-1-how-many-humans-group-3",
    "label": "1.1 [How many humans? Group]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "actor-group-4",
      "label": "group",
      "synset": "group.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-people-5",
        "label": "people",
        "synset": "people.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-populace-6",
          "label": "populace",
          "synset": "populace.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-class-7",
          "label": "class",
          "synset": "class.n.03",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "actor-market-8",
            "label": "market",
            "synset": "market.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "actor-population-9",
          "label": "population",
          "synset": "population.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-clientele-10",
          "label": "clientele",
          "synset": "clientele.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-multitude-11",
        "label": "multitude",
        "synset": "multitude.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-audience-12",
          "label": "audience",
          "synset": "audience.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-social-group-13",
        "label": "social_group",
        "synset": "social_group.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-organization-14",
          "label": "organization",
          "synset": "organization.n.01",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "actor-force-15",
            "label": "force",
            "synset": "force.n.04",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "actor-staff-16",
              "label": "staff",
              "synset": "staff.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "actor-unit-17",
            "label": "unit",
            "synset": "unit.n.03",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "actor-administrative-unit-18",
              "label": "administrative_unit",
              "synset": "administrative_unit.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-division-19",
              "label": "division",
              "synset": "division.n.04",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-department-20",
              "label": "department",
              "synset": "department.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-agency-21",
              "label": "agency",
              "synset": "agency.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-law-enforcement-agency-22",
              "label": "law_enforcement_agency",
              "synset": "law_enforcement_agency.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-police-23",
              "label": "police",
              "synset": "police.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-committee-24",
              "label": "committee",
              "synset": "committee.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-board-25",
              "label": "board",
              "synset": "board.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-crew-26",
              "label": "crew",
              "synset": "crew.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-gang-27",
              "label": "gang",
              "synset": "gang.n.03",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-team-28",
              "label": "team",
              "synset": "team.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-military-unit-29",
              "label": "military_unit",
              "synset": "military_unit.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-command-30",
              "label": "command",
              "synset": "command.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-family-31",
              "label": "family",
              "synset": "family.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "actor-institution-32",
            "label": "institution",
            "synset": "institution.n.01",
            "virtual": false,
            "status": "none",
            "children": [
             {
              "id": "actor-educational-institution-33",
              "label": "educational_institution",
              "synset": "educational_institution.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-school-34",
              "label": "school",
              "synset": "school.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-university-35",
              "label": "university",
              "synset": "university.n.03",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "actor-enterprise-36",
            "label": "enterprise",
            "synset": "enterprise.n.02",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "actor-business-37",
              "label": "business",
              "synset": "business.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-firm-38",
              "label": "firm",
              "synset": "firm.n.01, company.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-corporation-39",
              "label": "corporation",
              "synset": "corporation.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-publisher-40",
              "label": "publisher",
              "synset": "publisher.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-service-41",
              "label": "service",
              "synset": "service.n.04",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-investment-company-42",
              "label": "investment_company",
              "synset": "investment_company.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-carrier-43",
              "label": "carrier",
              "synset": "carrier.n.05",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-line-44",
              "label": "line",
              "synset": "line.n.23",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-railway-45",
              "label": "railway",
              "synset": "railway.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-rail-46",
              "label": "rail",
              "synset": "rail.n.02",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-manufacturer-47",
              "label": "manufacturer",
              "synset": "manufacturer.n.01",
              "virtual": false,
              "status": "none"
             },
             {
              "id": "actor-commercial-enterprise-48",
              "label": "commercial_enterprise",
              "synset": "commercial_enterprise.n.01",
              "virtual": true,
              "status": "none"
             },
             {
              "id": "actor-industry-49",
              "label": "industry",
              "synset": "industry.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "actor-association-50",
            "label": "association",
            "synset": "association.n.01",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "actor-alliance-51",
            "label": "alliance",
            "synset": "alliance.n.03",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "actor-nongovernmental-organization-52",
            "label": "nongovernmental_organization",
            "synset": "nongovernmental_organization.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "actor-committee-53",
              "label": "committee",
              "synset": "committee.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "actor-company-54",
            "label": "company",
            "synset": "company.n.04",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "actor-polity-55",
            "label": "polity",
            "synset": "polity.n.02",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "actor-government-56",
              "label": "government",
              "synset": "government.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "actor-musical-organization-57",
            "label": "musical_organization",
            "synset": "musical_organization.n.01",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "actor-orchestra-58",
              "label": "orchestra",
              "synset": "orchestra.n.01",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "actor-party-59",
            "label": "party",
            "synset": "party.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "actor-body-60",
          "label": "body",
          "synset": "body.n.02",
          "virtual": false,
          "status": "none",
          "children": [
           {
            "id": "actor-administration-61",
            "label": "administration",
            "synset": "administration.n.02",
            "virtual": true,
            "status": "none",
            "children": [
             {
              "id": "actor-management-62",
              "label": "management",
              "synset": "management.n.02",
              "virtual": false,
              "status": "none"
             }
            ]
           },
           {
            "id": "actor-panel-63",
            "label": "panel",
            "synset": "panel.n.04",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "actor-staff-64",
            "label": "staff",
            "synset": "staff.n.03",
            "virtual": false,
            "status": "none"
           },
           {
            "id": "actor-jury-65",
            "label": "jury",
            "synset": "jury.n.01",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "actor-kin-66",
          "label": "kin",
          "synset": "kin.n.02",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "actor-family-67",
            "label": "family",
            "synset": "family.n.02",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "actor-set-68",
          "label": "set",
          "synset": "set.n.05",
          "virtual": true,
          "status": "none",
          "children": [
           {
            "id": "actor-party-69",
            "label": "party",
            "synset": "party.n.03",
            "virtual": false,
            "status": "none"
           }
          ]
         },
         {
          "id": "actor-community-70",
          "label": "community",
          "synset": "community.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-audience-71",
          "label": "audience",
          "synset": "audience.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "id": "actor-1-2-how-many-humans-individual-72",
    "label": "1.2 [How many humans? Individual]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "actor-person-73",
      "label": "person",
      "synset": "person.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "actor-subjective-identity-74",
    "label": "[subjective identity]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "actor-unfortunate-75",
      "label": "unfortunate",
      "synset": "unfortunate.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-sick-person-76",
        "label": "sick_person",
        "synset": "sick_person.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-patient-77",
          "label": "patient",
          "synset": "patient.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-outpatient-78",
          "label": "outpatient",
          "synset": "outpatient.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-prisoner-79",
        "label": "prisoner",
        "synset": "prisoner.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-convict-80",
          "label": "convict",
          "synset": "convict.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-mourner-81",
        "label": "mourner",
        "synset": "mourner.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-pallbearer-82",
          "label": "pallbearer",
          "synset": "pallbearer.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-victim-83",
        "label": "victim",
        "synset": "victim.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-prey-84",
          "label": "prey",
          "synset": "prey.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-good-person-85",
      "label": "good_person",
      "synset": null,
      "virtual": true,
      "status": "none"
     },
     {
      "id": "actor-bad-person-86",
      "label": "bad_person",
      "synset": "bad_person.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-wrongdoer-87",
        "label": "wrongdoer",
        "synset": "wrongdoer.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-principal-88",
          "label": "principal",
          "synset": "principal.n.05",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-criminal-89",
          "label": "criminal",
          "synset": "criminal.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-fugitive-90",
          "label": "fugitive",
          "synset": "fugitive.n.02",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-escapee-91",
          "label": "escapee",
          "synset": "escapee.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-probationer-92",
          "label": "probationer",
          "synset": "probationer.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-thief-93",
          "label": "thief",
          "synset": "thief.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-booster-94",
          "label": "booster",
          "synset": "booster.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-violator-95",
          "label": "violator",
          "synset": "violator.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-perpetrator-96",
          "label": "perpetrator",
          "synset": "perpetrator.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-unskilled-person-97",
      "label": "unskilled_person",
      "synset": "unskilled_person.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-novice-98",
        "label": "novice",
        "synset": "novice.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-trainee-99",
          "label": "trainee",
          "synset": "trainee.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-disputant-100",
      "label": "disputant",
      "synset": "disputant.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "actor-professional-roles-101",
    "label": "[professional roles]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "actor-legal-roles-102",
      "label": "legal roles",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-suspect-103",
        "label": "suspect",
        "synset": "suspect.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-witness-104",
        "label": "witness",
        "synset": "witness.n.05",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-operator-105",
      "label": "operator",
      "synset": "operator.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-driver-106",
        "label": "driver",
        "synset": "driver.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-motorist-107",
          "label": "motorist",
          "synset": "motorist.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-benefactor-108",
      "label": "benefactor",
      "synset": "benefactor.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-donor-109",
        "label": "donor",
        "synset": "donor.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-provider-110",
        "label": "provider",
        "synset": "provider.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-patron-111",
        "label": "patron",
        "synset": "patron.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-contestant-112",
      "label": "contestant",
      "synset": "contestant.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-candidate-113",
        "label": "candidate",
        "synset": "candidate.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-athlete-114",
        "label": "athlete",
        "synset": "athlete.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-swimmer-115",
          "label": "swimmer",
          "synset": "swimmer.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-diver-116",
          "label": "diver",
          "synset": "diver.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-player-117",
        "label": "player",
        "synset": "player.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-card-player-118",
          "label": "card_player",
          "synset": "card_player.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-dealer-119",
          "label": "dealer",
          "synset": "dealer.n.05",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-capitalist-120",
      "label": "capitalist",
      "synset": "capitalist.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-businessperson-121",
        "label": "businessperson",
        "synset": "businessperson.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-merchant-122",
          "label": "merchant",
          "synset": "merchant.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-seller-123",
          "label": "seller",
          "synset": "seller.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-butcher-124",
          "label": "butcher",
          "synset": "butcher.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-shopkeeper-125",
          "label": "shopkeeper",
          "synset": "shopkeeper.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-cleaner-126",
          "label": "cleaner",
          "synset": "cleaner.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-trader-127",
          "label": "trader",
          "synset": "trader.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-retailer-128",
          "label": "retailer",
          "synset": "retailer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-businessman-129",
          "label": "businessman",
          "synset": "businessman.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-operator-130",
          "label": "operator",
          "synset": "operator.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-supplier-131",
          "label": "supplier",
          "synset": "supplier.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-caterer-132",
          "label": "caterer",
          "synset": "caterer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-distributor-133",
          "label": "distributor",
          "synset": "distributor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-recruiter-134",
          "label": "recruiter",
          "synset": "recruiter.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-agent-135",
          "label": "agent",
          "synset": "agent.n.04",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-insurance-broker-136",
          "label": "insurance_broker",
          "synset": "insurance_broker.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-exporter-137",
          "label": "exporter",
          "synset": "exporter.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-importer-138",
          "label": "importer",
          "synset": "importer.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-creditor-139",
        "label": "creditor",
        "synset": "creditor.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-investor-140",
        "label": "investor",
        "synset": "investor.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-lender-141",
          "label": "lender",
          "synset": "lender.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-owner-142",
      "label": "owner",
      "synset": "owner.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-holder-143",
        "label": "holder",
        "synset": "holder.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-tenant-144",
          "label": "tenant",
          "synset": "tenant.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-communicator-145",
      "label": "communicator",
      "synset": "communicator.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-negotiator-146",
        "label": "negotiator",
        "synset": "negotiator.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-representative-147",
          "label": "representative",
          "synset": "representative.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-agent-148",
          "label": "agent",
          "synset": "agent.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-handler-149",
          "label": "handler",
          "synset": "handler.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-contact-150",
          "label": "contact",
          "synset": "contact.n.05",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-mediator-151",
          "label": "mediator",
          "synset": "mediator.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-interpreter-152",
          "label": "interpreter",
          "synset": "interpreter.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-writer-153",
        "label": "writer",
        "synset": "writer.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-drafter-154",
          "label": "drafter",
          "synset": "drafter.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-informant-155",
        "label": "informant",
        "synset": "informant.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-articulator-156",
        "label": "articulator",
        "synset": "articulator.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-speaker-157",
          "label": "speaker",
          "synset": "speaker.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-inquirer-158",
          "label": "inquirer",
          "synset": "inquirer.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-interviewer-159",
          "label": "interviewer",
          "synset": "interviewer.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-reporter-160",
        "label": "reporter",
        "synset": "reporter.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-leader-161",
      "label": "leader",
      "synset": "leader.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-authority-162",
        "label": "authority",
        "synset": "authority.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-superior-163",
        "label": "superior",
        "synset": "superior.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-supervisor-164",
          "label": "supervisor",
          "synset": "supervisor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-foreman-165",
          "label": "foreman",
          "synset": "foreman.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-head-166",
        "label": "head",
        "synset": "head.n.04",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-administrator-167",
          "label": "administrator",
          "synset": "administrator.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-director-168",
          "label": "director",
          "synset": "director.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-executive-169",
          "label": "executive",
          "synset": "executive.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-employer-170",
        "label": "employer",
        "synset": "employer.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-master-171",
          "label": "master",
          "synset": "master.n.04",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-postmaster-172",
          "label": "postmaster",
          "synset": "postmaster.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-trainer-173",
        "label": "trainer",
        "synset": "trainer.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-politician-174",
        "label": "politician",
        "synset": "politician.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-campaigner-175",
          "label": "campaigner",
          "synset": "campaigner.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-guide-176",
        "label": "guide",
        "synset": "guide.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-worker-177",
      "label": "worker",
      "synset": "worker.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-planner-178",
        "label": "planner",
        "synset": "planner.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-coordinator-179",
          "label": "coordinator",
          "synset": "coordinator.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-collector-180",
        "label": "collector",
        "synset": "collector.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-skilled-worker-181",
        "label": "skilled_worker",
        "synset": "skilled_worker.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-expert-182",
          "label": "expert",
          "synset": "expert.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-entertainer-183",
          "label": "entertainer",
          "synset": "entertainer.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-performer-184",
          "label": "performer",
          "synset": "performer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-actor-185",
          "label": "actor",
          "synset": "actor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-dancer-186",
          "label": "dancer",
          "synset": "dancer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-musician-187",
          "label": "musician",
          "synset": "musician.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-soloist-188",
          "label": "soloist",
          "synset": "soloist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-creator-189",
          "label": "creator",
          "synset": "creator.n.02",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-farmer-190",
          "label": "farmer",
          "synset": "farmer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-agriculturist-191",
          "label": "agriculturist",
          "synset": "agriculturist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-rancher-192",
          "label": "rancher",
          "synset": "rancher.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-architect-193",
          "label": "architect",
          "synset": "architect.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-programmer-194",
          "label": "programmer",
          "synset": "programmer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-intellectual-195",
          "label": "intellectual",
          "synset": "intellectual.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-engineer-196",
          "label": "engineer",
          "synset": "engineer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-surveyor-197",
          "label": "surveyor",
          "synset": "surveyor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-scientist-198",
          "label": "scientist",
          "synset": "scientist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-psychologist-199",
          "label": "psychologist",
          "synset": "psychologist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-research-worker-200",
          "label": "research_worker",
          "synset": "research_worker.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-physicist-201",
          "label": "physicist",
          "synset": "physicist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-linguist-202",
          "label": "linguist",
          "synset": "linguist.n.02",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-translator-203",
          "label": "translator",
          "synset": "translator.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-forecaster-204",
          "label": "forecaster",
          "synset": "forecaster.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-scholar-205",
          "label": "scholar",
          "synset": "scholar.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-authority-206",
          "label": "authority",
          "synset": "authority.n.03",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-adviser-207",
          "label": "adviser",
          "synset": "adviser.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-counselor-208",
          "label": "counselor",
          "synset": "counselor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-adjudicator-209",
          "label": "adjudicator",
          "synset": "adjudicator.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-arbiter-210",
          "label": "arbiter",
          "synset": "arbiter.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-official-211",
          "label": "official",
          "synset": "official.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-juror-212",
          "label": "juror",
          "synset": "juror.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-specialist-213",
          "label": "specialist",
          "synset": "specialist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-interior-designer-214",
          "label": "interior_designer",
          "synset": "interior_designer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-graphic-designer-215",
          "label": "graphic_designer",
          "synset": "graphic_designer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-dietician-216",
          "label": "dietician",
          "synset": "dietician.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-therapist-217",
          "label": "therapist",
          "synset": "therapist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-analyst-218",
          "label": "analyst",
          "synset": "analyst.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-investigator-219",
          "label": "investigator",
          "synset": "investigator.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-adjuster-220",
          "label": "adjuster",
          "synset": "adjuster.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-coroner-221",
          "label": "coroner",
          "synset": "coroner.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-examiner-222",
          "label": "examiner",
          "synset": "examiner.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-geographer-223",
          "label": "geographer",
          "synset": "geographer.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-cartographer-224",
          "label": "cartographer",
          "synset": "cartographer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-observer-225",
          "label": "observer",
          "synset": "observer.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-technician-226",
          "label": "technician",
          "synset": "technician.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-official-227",
          "label": "official",
          "synset": "official.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-judge-228",
          "label": "judge",
          "synset": "judge.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-officeholder-229",
          "label": "officeholder",
          "synset": "officeholder.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-cook-230",
          "label": "cook",
          "synset": "cook.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-chef-231",
          "label": "chef",
          "synset": "chef.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-mender-232",
          "label": "mender",
          "synset": "mender.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-repairman-233",
          "label": "repairman",
          "synset": "repairman.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-automobile-mechanic-234",
          "label": "automobile_mechanic",
          "synset": "automobile_mechanic.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-aviator-235",
          "label": "aviator",
          "synset": "aviator.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-pilot-236",
          "label": "pilot",
          "synset": "pilot.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-cutter-237",
          "label": "cutter",
          "synset": "cutter.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-sailor-238",
          "label": "sailor",
          "synset": "sailor.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-mariner-239",
          "label": "mariner",
          "synset": "mariner.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-deckhand-240",
          "label": "deckhand",
          "synset": "deckhand.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-helmsman-241",
          "label": "helmsman",
          "synset": "helmsman.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-officer-242",
          "label": "officer",
          "synset": "officer.n.04",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-master-243",
          "label": "master",
          "synset": "master.n.07",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-editor-244",
          "label": "editor",
          "synset": "editor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-craftsman-245",
          "label": "craftsman",
          "synset": "craftsman.n.03",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-hairdresser-246",
          "label": "hairdresser",
          "synset": "hairdresser.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-machinist-247",
          "label": "machinist",
          "synset": "machinist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-welder-248",
          "label": "welder",
          "synset": "welder.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-printer-249",
          "label": "printer",
          "synset": "printer.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-employee-250",
        "label": "employee",
        "synset": "employee.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-workman-251",
          "label": "workman",
          "synset": "workman.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-laborer-252",
          "label": "laborer",
          "synset": "laborer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-clerk-253",
          "label": "clerk",
          "synset": "clerk.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-salesperson-254",
          "label": "salesperson",
          "synset": "salesperson.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-demonstrator-255",
          "label": "demonstrator",
          "synset": "demonstrator.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-dispatcher-256",
          "label": "dispatcher",
          "synset": "dispatcher.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-volunteer-257",
        "label": "volunteer",
        "synset": "volunteer.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-assistant-258",
        "label": "assistant",
        "synset": "assistant.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-subordinate-259",
          "label": "subordinate",
          "synset": "subordinate.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-associate-260",
          "label": "associate",
          "synset": "associate.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-attendant-261",
          "label": "attendant",
          "synset": "attendant.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-escort-262",
          "label": "escort",
          "synset": "escort.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-dresser-263",
          "label": "dresser",
          "synset": "dresser.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-prompter-264",
          "label": "prompter",
          "synset": "prompter.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-processor-265",
        "label": "processor",
        "synset": "processor.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-fiduciary-266",
      "label": "fiduciary",
      "synset": "fiduciary.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-administrator-267",
        "label": "administrator",
        "synset": "administrator.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-executor-268",
        "label": "executor",
        "synset": "executor.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-acquirer-269",
      "label": "acquirer",
      "synset": "acquirer.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-recipient-270",
        "label": "recipient",
        "synset": "recipient.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-beneficiary-271",
          "label": "beneficiary",
          "synset": "beneficiary.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-borrower-272",
          "label": "borrower",
          "synset": "borrower.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-consignee-273",
          "label": "consignee",
          "synset": "consignee.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-money-handler-274",
      "label": "money_handler",
      "synset": "money_handler.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-payer-275",
        "label": "payer",
        "synset": "payer.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-taxpayer-276",
          "label": "taxpayer",
          "synset": "taxpayer.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-traveler-277",
      "label": "traveler",
      "synset": "traveler.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-visitor-278",
        "label": "visitor",
        "synset": "visitor.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-guest-279",
          "label": "guest",
          "synset": "guest.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-passenger-280",
        "label": "passenger",
        "synset": "passenger.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-arrival-281",
        "label": "arrival",
        "synset": "arrival.n.03",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-pedestrian-282",
        "label": "pedestrian",
        "synset": "pedestrian.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-tourist-283",
        "label": "tourist",
        "synset": "tourist.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-entrant-284",
        "label": "entrant",
        "synset": "entrant.n.03",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-intruder-285",
          "label": "intruder",
          "synset": "intruder.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-preserver-286",
      "label": "preserver",
      "synset": "preserver.n.03",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-defender-287",
        "label": "defender",
        "synset": "defender.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-fireman-288",
          "label": "fireman",
          "synset": "fireman.n.04",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-guard-289",
          "label": "guard",
          "synset": "guard.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-screener-290",
          "label": "screener",
          "synset": "screener.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-perceiver-291",
      "label": "perceiver",
      "synset": "perceiver.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-witness-292",
        "label": "witness",
        "synset": "witness.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-spectator-293",
        "label": "spectator",
        "synset": "spectator.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-eyewitness-294",
          "label": "eyewitness",
          "synset": "eyewitness.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-subject-295",
      "label": "subject",
      "synset": "subject.n.02",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "actor-social-and-personal-identities-296",
    "label": "[social and personal identities]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "actor-relative-297",
      "label": "relative",
      "synset": "relative.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-ancestor-298",
        "label": "ancestor",
        "synset": "ancestor.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-progenitor-299",
          "label": "progenitor",
          "synset": "progenitor.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-genitor-300",
          "label": "genitor",
          "synset": "genitor.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-parent-301",
          "label": "parent",
          "synset": "parent.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-offspring-302",
        "label": "offspring",
        "synset": "offspring.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-child-303",
          "label": "child",
          "synset": "child.n.02",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-baby-304",
          "label": "baby",
          "synset": "baby.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-kin-305",
        "label": "kin",
        "synset": "kin.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-user-306",
      "label": "user",
      "synset": "user.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-consumer-307",
        "label": "consumer",
        "synset": "consumer.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-customer-308",
          "label": "customer",
          "synset": "customer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-guest-309",
          "label": "guest",
          "synset": "guest.n.03",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-buyer-310",
          "label": "buyer",
          "synset": "buyer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-policyholder-311",
          "label": "policyholder",
          "synset": "policyholder.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-neighbor-312",
      "label": "neighbor",
      "synset": "neighbor.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "actor-enrollee-313",
      "label": "enrollee",
      "synset": "enrollee.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-student-314",
        "label": "student",
        "synset": "student.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-peer-315",
      "label": "peer",
      "synset": "peer.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-associate-316",
        "label": "associate",
        "synset": "associate.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-colleague-317",
          "label": "colleague",
          "synset": "colleague.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-member-318",
          "label": "member",
          "synset": "member.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-participant-319",
          "label": "participant",
          "synset": "participant.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-collaborator-320",
          "label": "collaborator",
          "synset": "collaborator.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-stand-in-321",
        "label": "stand-in",
        "synset": "stand-in.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-adult-322",
      "label": "adult",
      "synset": "adult.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-professional-323",
        "label": "professional",
        "synset": "professional.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-health-professional-324",
          "label": "health_professional",
          "synset": "health_professional.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-medical-practitioner-325",
          "label": "medical_practitioner",
          "synset": "medical_practitioner.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-doctor-326",
          "label": "doctor",
          "synset": "doctor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-house-physician-327",
          "label": "house_physician",
          "synset": "house_physician.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-specialist-328",
          "label": "specialist",
          "synset": "specialist.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-diagnostician-329",
          "label": "diagnostician",
          "synset": "diagnostician.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-anesthesiologist-330",
          "label": "anesthesiologist",
          "synset": "anesthesiologist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-dermatologist-331",
          "label": "dermatologist",
          "synset": "dermatologist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-oncologist-332",
          "label": "oncologist",
          "synset": "oncologist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-ophthalmologist-333",
          "label": "ophthalmologist",
          "synset": "ophthalmologist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-veterinarian-334",
          "label": "veterinarian",
          "synset": "veterinarian.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-surgeon-335",
          "label": "surgeon",
          "synset": "surgeon.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-dentist-336",
          "label": "dentist",
          "synset": "dentist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-nurse-337",
          "label": "nurse",
          "synset": "nurse.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-midwife-338",
          "label": "midwife",
          "synset": "midwife.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-pharmacist-339",
          "label": "pharmacist",
          "synset": "pharmacist.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-practitioner-340",
          "label": "practitioner",
          "synset": "practitioner.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-clinician-341",
          "label": "clinician",
          "synset": "clinician.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-educator-342",
          "label": "educator",
          "synset": "educator.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-teacher-343",
          "label": "teacher",
          "synset": "teacher.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-coach-344",
          "label": "coach",
          "synset": "coach.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-lawyer-345",
          "label": "lawyer",
          "synset": "lawyer.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-advocate-346",
          "label": "advocate",
          "synset": "advocate.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-librarian-347",
          "label": "librarian",
          "synset": "librarian.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-caregiver-348",
        "label": "caregiver",
        "synset": "caregiver.n.02",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-host-349",
        "label": "host",
        "synset": "host.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-hostess-350",
          "label": "hostess",
          "synset": "hostess.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-woman-351",
        "label": "woman",
        "synset": "woman.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-juvenile-352",
      "label": "juvenile",
      "synset": "juvenile.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-child-353",
        "label": "child",
        "synset": "child.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-adolescent-354",
        "label": "adolescent",
        "synset": "adolescent.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-applicant-355",
      "label": "applicant",
      "synset": "applicant.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-claimant-356",
        "label": "claimant",
        "synset": "claimant.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-inhabitant-357",
      "label": "inhabitant",
      "synset": "inhabitant.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-resident-358",
        "label": "resident",
        "synset": "resident.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-subject-359",
      "label": "subject",
      "synset": "subject.n.06",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-party-360",
        "label": "party",
        "synset": "party.n.05",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-contractor-361",
          "label": "contractor",
          "synset": "contractor.n.03",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-builder-362",
          "label": "builder",
          "synset": "builder.n.03",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-contractor-363",
          "label": "contractor",
          "synset": "contractor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-subcontractor-364",
          "label": "subcontractor",
          "synset": "subcontractor.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-litigant-365",
          "label": "litigant",
          "synset": "litigant.n.01",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-defendant-366",
          "label": "defendant",
          "synset": "defendant.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-acquaintance-367",
      "label": "acquaintance",
      "synset": "acquaintance.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "actor-national-368",
      "label": "national",
      "synset": "national.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-citizen-369",
        "label": "citizen",
        "synset": "citizen.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-voter-370",
          "label": "voter",
          "synset": "voter.n.01",
          "virtual": true,
          "status": "none"
         },
         {
          "id": "actor-constituent-371",
          "label": "constituent",
          "synset": "constituent.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-dead-person-372",
      "label": "dead_person",
      "synset": "dead_person.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "actor-2-animal-373",
    "label": "2. Animal",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-2-1-how-many-animals-group-374",
    "label": "2.1 [How many animals? Group]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "actor-biological-group-375",
      "label": "biological_group",
      "synset": "biological_group.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-animal-group-376",
        "label": "animal_group",
        "synset": "animal_group.n.01",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-herd-377",
          "label": "herd",
          "synset": "herd.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-population-378",
        "label": "population",
        "synset": "population.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "actor-2-2-how-many-animals-individual-379",
    "label": "2.2 [How many animals? Individual]",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-3-machine-380",
    "label": "3. Machine",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-3-1-how-many-machines-group-381",
    "label": "3.1 [How many machines? Group]",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-3-2-how-many-machines-individual-382",
    "label": "3.2 [How many machines? Individual]",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-4-other-unspecified-383",
    "label": "4. Other / Unspecified",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-4-1-how-many-other-unspecified-group-384",
    "label": "4.1 [How many other / unspecified? Group]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "actor-system-385",
      "label": "system",
      "synset": "system.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-network-386",
        "label": "network",
        "synset": "network.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-body-387",
        "label": "body",
        "synset": "body.n.06",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-ecosystem-388",
        "label": "ecosystem",
        "synset": "ecosystem.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-subsystem-389",
        "label": "subsystem",
        "synset": "subsystem.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   },
   {
    "id": "actor-4-2-how-many-other-unspecified-individual-390",
    "label": "4.2 [How many other / unspecified? Individual]",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-5-misclassified-391",
    "label": "5. Misclassified",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-case-392",
    "label": "case",
    "synset": "case.n.06",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-interest-393",
    "label": "interest",
    "synset": "interest.n.06",
    "virtual": false,
    "status": "none"
   },
   {
    "id": "actor-gathering-394",
    "label": "gathering",
    "synset": "gathering.n.01",
    "virtual": true,
    "status": "none",
    "children": [
     {
      "id": "actor-meeting-395",
      "label": "meeting",
      "synset": "meeting.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "actor-conference-396",
        "label": "conference",
        "synset": "conference.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "actor-convention-397",
        "label": "convention",
        "synset": "convention.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "actor-social-gathering-398",
      "label": "social_gathering",
      "synset": "social_gathering.n.01",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-meeting-399",
        "label": "meeting",
        "synset": "meeting.n.02",
        "virtual": true,
        "status": "none",
        "children": [
         {
          "id": "actor-date-400",
          "label": "date",
          "synset": "date.n.03",
          "virtual": false,
          "status": "none"
         }
        ]
       },
       {
        "id": "actor-party-401",
        "label": "party",
        "synset": "party.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-dinner-402",
          "label": "dinner",
          "synset": "dinner.n.02",
          "virtual": false,
          "status": "none"
         },
         {
          "id": "actor-reception-403",
          "label": "reception",
          "synset": "reception.n.02",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-table-404",
      "label": "table",
      "synset": "table.n.05",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "actor-assembly-405",
      "label": "assembly",
      "synset": "assembly.n.04",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-court-406",
        "label": "court",
        "synset": "court.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "actor-court-407",
          "label": "court",
          "synset": "court.n.08",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "actor-fair-408",
      "label": "fair",
      "synset": "fair.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "actor-class-409",
      "label": "class",
      "synset": "class.n.02",
      "virtual": true,
      "status": "none",
      "children": [
       {
        "id": "actor-section-410",
        "label": "section",
        "synset": "section.n.09",
        "virtual": false,
        "status": "none"
       }
      ]
     }
    ]
   }
  ]
 },
 "activities": {
  "id": "activities",
  "label": "Activities",
  "synset": null,
  "virtual": false,
  "status": "none",
  "children": [
   {
    "id": "activities-1-information-activities-1",
    "label": "1. Information Activities",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-1-1-create-information-2",
    "label": "1.1 Create Information",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-analyze-3",
    "label": "Analyze",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-investigation-4",
      "label": "investigation",
      "synset": "investigation.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-research-5",
        "label": "research",
        "synset": "research.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-experiment-6",
          "label": "experiment",
          "synset": "experiment.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Experiment (Experiment.v.01)"
         },
         {
          "id": "activities-testing-running-experiments-7",
          "label": "testing (running experiments)",
          "synset": "testing.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Experiment (Experiment.v.01)"
         },
         {
          "id": "activities-microscopy-8",
          "label": "microscopy",
          "synset": "microscopy.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Research (Research.v.01, Research.v.02)"
         },
         {
          "id": "activities-spectroscopy-9",
          "label": "spectroscopy",
          "synset": "spectroscopy.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Research (Research.v.01, Research.v.02)"
         }
        ],
        "verb": "Research (Research.v.01, Research.v.02)"
       },
       {
        "id": "activities-examination-scrutiny-10",
        "label": "examination (scrutiny)",
        "synset": "examination.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-survey-11",
          "label": "survey",
          "synset": "survey.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Survey (Survey.v.02, Survey.v.05)"
         },
         {
          "id": "activities-audit-12",
          "label": "audit",
          "synset": "audit.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Audit (Audit.v.01)"
         },
         {
          "id": "activities-inspection-13",
          "label": "inspection",
          "synset": "inspection.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Inspect (Inspect.v.01)"
         },
         {
          "id": "activities-check-14",
          "label": "check",
          "synset": "check.n.06",
          "virtual": false,
          "status": "none",
          "verb": "Check (Check.v.01)"
         },
         {
          "id": "activities-autopsy-15",
          "label": "autopsy",
          "synset": "autopsy.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Examine (Examine.v.02)"
         },
         {
          "id": "activities-testing-evaluative-screening-16",
          "label": "testing (evaluative screening)",
          "synset": "testing.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Test (Test.v.01)"
         },
         {
          "id": "activities-screening-17",
          "label": "screening",
          "synset": "screening.n.04",
          "virtual": false,
          "status": "none",
          "verb": "Screen (Screen.v.02, Screen.v.05)"
         }
        ],
        "verb": "Examine (Examine.v.02)"
       },
       {
        "id": "activities-inquiry-18",
        "label": "inquiry",
        "synset": "inquiry.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Investigate (Investigate.v.01)"
       },
       {
        "id": "activities-count-19",
        "label": "count",
        "synset": "count.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Count (Count.v.01)"
       }
      ],
      "verb": "Investigate (Investigate.v.01)"
     }
    ]
   },
   {
    "id": "activities-analyze-characterize-20",
    "label": "Analyze > Characterize",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-characterization-21",
      "label": "characterization",
      "synset": "characterization.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Characterize (Qualify.v.06)"
     }
    ]
   },
   {
    "id": "activities-analyze-determine-22",
    "label": "Analyze > Determine",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-determination-23",
      "label": "determination",
      "synset": "determination.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-designation-24",
        "label": "designation",
        "synset": "designation.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Identify (Name.v.02)"
       }
      ],
      "verb": "Determine (Determine.v.01, Determine.v.08)"
     }
    ]
   },
   {
    "id": "activities-calculate-25",
    "label": "Calculate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-calculation-26",
      "label": "calculation",
      "synset": "calculation.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-algorithm-27",
        "label": "algorithm",
        "synset": "algorithm.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Calculate (Calculate.v.01, Calculate.v.02)"
       }
      ],
      "verb": "Calculate (Calculate.v.01, Calculate.v.02)"
     }
    ]
   },
   {
    "id": "activities-decide-28",
    "label": "Decide",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-choice-29",
      "label": "choice",
      "synset": "choice.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-decision-30",
        "label": "decision",
        "synset": "decision.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-appointment-31",
          "label": "appointment",
          "synset": "appointment.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Appoint (Appoint.v.02)"
         }
        ],
        "verb": "Decide (Decide.v.01)"
       }
      ],
      "verb": "Select (Choose.v.01)"
     },
     {
      "id": "activities-rejection-32",
      "label": "rejection",
      "synset": "rejection.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Reject (Deny.v.04, Refuse.v.02, Reject.v.01, Reject.v.06)"
     }
    ]
   },
   {
    "id": "activities-decide-select-select-for-what-purpose-33",
    "label": "Decide > Select > [Select for what purpose?]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-categorization-34",
      "label": "categorization",
      "synset": "categorization.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Categorize (Categorize.v.01)"
     },
     {
      "id": "activities-sampling-35",
      "label": "sampling",
      "synset": "sampling.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Taste (Sample.v.01)"
     },
     {
      "id": "activities-diagnosis-36",
      "label": "diagnosis",
      "synset": "diagnosis.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-prognosis-37",
        "label": "prognosis",
        "synset": "prognosis.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Diagnose (Diagnose.v.01)"
       }
      ],
      "verb": "Diagnose (Diagnose.v.01)"
     },
     {
      "id": "activities-validation-38",
      "label": "validation",
      "synset": "validation.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Validate (Confirm.v.01, See.v.10, Validate.v.04, Verify.v.01)"
     }
    ]
   },
   {
    "id": "activities-express-information-record-39",
    "label": "Express information > Record",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-recording-40",
      "label": "recording",
      "synset": "recording.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Record (Record.v.01)"
     },
     {
      "id": "activities-writing-41",
      "label": "writing",
      "synset": "writing.n.05",
      "virtual": false,
      "status": "none",
      "verb": "Write (Write.v.01, Write.v.02)"
     },
     {
      "id": "activities-express-information-record-write-program-computer-42",
      "label": "Express information > Record > Write > Program  (computer)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-programming-43",
        "label": "programming",
        "synset": "programming.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Program (computer) (Program.v.02, Write.v.10)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-express-information-record-create-static-image-44",
    "label": "Express information > Record > Create static image",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-art-45",
      "label": "art",
      "synset": "art.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-drawing-46",
        "label": "drawing",
        "synset": "drawing.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Draw (drawing) (Draw.v.04, Draw.v.06)"
       }
      ],
      "verb": "Draw (drawing) (Draw.v.04, Draw.v.06)"
     },
     {
      "id": "activities-photography-47",
      "label": "photography",
      "synset": "photography.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-exposure-48",
        "label": "exposure",
        "synset": "exposure.n.08",
        "virtual": false,
        "status": "none",
        "verb": "Photograph (Photograph.v.01)"
       },
       {
        "id": "activities-angiography-49",
        "label": "angiography",
        "synset": "angiography.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Photograph (Photograph.v.01)"
       },
       {
        "id": "activities-sonography-50",
        "label": "sonography",
        "synset": "sonography.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Visualize (Visualize.v.04)"
       }
      ],
      "verb": "Photograph (Photograph.v.01)"
     }
    ]
   },
   {
    "id": "activities-express-information-record-create-moving-image-51",
    "label": "Express information > Record > Create moving image",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-animation-52",
      "label": "animation",
      "synset": "animation.n.05",
      "virtual": false,
      "status": "none",
      "verb": "Film (Film.v.01)"
     }
    ]
   },
   {
    "id": "activities-express-information-record-document-53",
    "label": "Express information > Record > Document",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-listing-54",
      "label": "listing",
      "synset": "listing.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-inventory-55",
        "label": "inventory",
        "synset": "inventory.n.05",
        "virtual": false,
        "status": "none",
        "verb": "Document (Document.v.01, Inventory.v.01, Keep.v.08, Log.v.01, Register.v.01)"
       }
      ],
      "verb": "List (List.v.02)"
     },
     {
      "id": "activities-express-information-record-mark-information-56",
      "label": "Express information > Record > Mark  (information)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-label-57",
        "label": "label",
        "synset": "label.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Mark (information) (Code.v.01, Mark.v.02, Tag.v.01)"
       }
      ]
     },
     {
      "id": "activities-express-information-record-copy-information-model-represent-58",
      "label": "Express information > Record > Copy (information) > Model  (represent)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-model-59",
        "label": "model",
        "synset": "model.n.09",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-simulation-60",
          "label": "simulation",
          "synset": "simulation.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Model (represent) (information) (Model.v.01, Model.v.05)"
         }
        ],
        "verb": "Model (represent) (information) (Model.v.01, Model.v.05)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-express-information-record-enroll-61",
    "label": "Express information > Record > Enroll",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-registration-62",
      "label": "registration",
      "synset": "registration.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Enroll (Enroll.v.01)"
     }
    ]
   },
   {
    "id": "activities-plan-63",
    "label": "Plan",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-planning-64",
      "label": "planning",
      "synset": "planning.n.01, planning.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-scheduling-65",
        "label": "scheduling",
        "synset": "scheduling.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-booking-66",
          "label": "booking",
          "synset": "booking.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Book (Book.v.01)"
         }
        ],
        "verb": "Schedule (Schedule.v.02)"
       }
      ],
      "verb": "Plan (Mastermind.v.01, Plan.v.02, Plan.v.03)"
     }
    ]
   },
   {
    "id": "activities-plan-design-67",
    "label": "Plan > Design",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-design-68",
      "label": "design",
      "synset": "design.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-approach-69",
        "label": "approach",
        "synset": "approach.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Conceptualize (Gestate.v.01)"
       }
      ],
      "verb": "Design (Design.v.02)"
     },
     {
      "id": "activities-reason-organize-analytically-70",
      "label": "Reason > Organize  (analytically)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-compilation-71",
        "label": "compilation",
        "synset": "compilation.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Organize (analytically) (Organize.v.04, Structure.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-solve-resolve-72",
    "label": "Solve > Resolve",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-resolution-73",
      "label": "resolution",
      "synset": "resolution.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Resolve (Decide.v.02)"
     }
    ]
   },
   {
    "id": "activities-1-2-modify-information-74",
    "label": "1.2 Modify Information",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-transform-information-revise-75",
    "label": "Transform information > Revise",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-revision-76",
      "label": "revision",
      "synset": "revision.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Revise (Revise.v.01)"
     },
     {
      "id": "activities-correction-77",
      "label": "correction",
      "synset": "correction.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-redress-78",
        "label": "redress",
        "synset": "redress.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Repair (information) (Correct.v.01, Correct.v.08, Repair.v.01)"
       }
      ],
      "verb": "Repair (information) (Correct.v.01, Correct.v.08, Repair.v.01)"
     },
     {
      "id": "activities-cancellation-79",
      "label": "cancellation",
      "synset": "cancellation.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Cancel (Cancel.v.03)"
     },
     {
      "id": "activities-updating-80",
      "label": "updating",
      "synset": "updating.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Update information (Update.v.01, Update.v.02)"
     },
     {
      "id": "activities-transform-information-adjust-information-81",
      "label": "Transform information > Adjust  (information)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-alteration-82",
        "label": "alteration",
        "synset": "alteration.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Alter (information) (Alter.v.03)"
       },
       {
        "id": "activities-discount-83",
        "label": "discount",
        "synset": "discount.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Decrease (Decrease.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-transform-information-use-84",
    "label": "Transform information > Use",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-use-85",
      "label": "use",
      "synset": "use.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-exploitation-86",
        "label": "exploitation",
        "synset": "exploitation.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Use (Put_on.v.07, Use.v.01)"
       }
      ],
      "verb": "Use (Put_on.v.07, Use.v.01)"
     },
     {
      "id": "activities-transform-information-process-information-87",
      "label": "Transform information > Process  (information)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-processing-88",
        "label": "processing",
        "synset": "processing.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-search-computational-retrieval-89",
          "label": "search (computational retrieval)",
          "synset": "search.n.03",
          "virtual": false,
          "status": "none",
          "verb": "Process (information) (Process.v.01, Process.v.03)"
         }
        ],
        "verb": "Process (information) (Process.v.01, Process.v.03)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-separate-information-90",
    "label": "Separate information",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-separation-91",
      "label": "separation",
      "synset": "separation.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-triage-92",
        "label": "triage",
        "synset": "triage.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Separate information (Separate.v.02)"
       }
      ],
      "verb": "Separate information (Separate.v.02)"
     }
    ]
   },
   {
    "id": "activities-1-3-store-information-93",
    "label": "1.3 Store Information",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-storage-informational-94",
      "label": "storage (informational)",
      "synset": "storage.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Store information (Conserve.v.02, Store.v.01, Store.v.02)"
     }
    ]
   },
   {
    "id": "activities-1-4-transfer-information-95",
    "label": "1.4 Transfer Information",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-communicate-end-to-end-96",
      "label": "Communicate  (end-to-end)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-communication-97",
        "label": "communication",
        "synset": "communication.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-contact-98",
          "label": "contact",
          "synset": "contact.n.08",
          "virtual": false,
          "status": "none",
          "verb": "Communicate (transfer information end-to-end) (Communicate.v.01, Communicate.v.02, Communicate.v.05)"
         },
         {
          "id": "activities-liaison-99",
          "label": "liaison",
          "synset": "liaison.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Communicate (transfer information end-to-end) (Communicate.v.01, Communicate.v.02, Communicate.v.05)"
         },
         {
          "id": "activities-traffic-100",
          "label": "traffic",
          "synset": "traffic.n.03",
          "virtual": false,
          "status": "none",
          "verb": "Communicate (transfer information end-to-end) (Communicate.v.01, Communicate.v.02, Communicate.v.05)"
         },
         {
          "id": "activities-transmission-101",
          "label": "transmission",
          "synset": "transmission.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Communicate (transfer information end-to-end) (Communicate.v.01, Communicate.v.02, Communicate.v.05)"
         }
        ],
        "verb": "Communicate (transfer information end-to-end) (Communicate.v.01, Communicate.v.02, Communicate.v.05)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-exchange-information-102",
    "label": "Exchange information",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-discussion-103",
      "label": "discussion",
      "synset": "discussion.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-detail-104",
        "label": "detail",
        "synset": "detail.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Confer (Confer.v.01)"
       }
      ],
      "verb": "Confer (Confer.v.01)"
     },
     {
      "id": "activities-negotiation-105",
      "label": "negotiation",
      "synset": "negotiation.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Negotiate (Negociate.v.06)"
     },
     {
      "id": "activities-examination-oral-106",
      "label": "examination (oral)",
      "synset": "examination.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Interview (Interview.v.01, Interview.v.02)"
     },
     {
      "id": "activities-interview-107",
      "label": "interview",
      "synset": "interview.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Interview (Interview.v.01, Interview.v.02)"
     },
     {
      "id": "activities-deposition-108",
      "label": "deposition",
      "synset": "deposition.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Testify (Testify.v.01, Testify.v.02)"
     }
    ]
   },
   {
    "id": "activities-exchange-information-teach-109",
    "label": "Exchange information > Teach",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-education-110",
      "label": "education",
      "synset": "education.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-course-111",
        "label": "course",
        "synset": "course.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-workshop-112",
          "label": "workshop",
          "synset": "workshop.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Teach (Educate.v.01, Prepare.v.05, Teach.v.01)"
         },
         {
          "id": "activities-orientation-course-113",
          "label": "orientation course",
          "synset": "orientation_course.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Teach (Educate.v.01, Prepare.v.05, Teach.v.01)"
         }
        ],
        "verb": "Teach (Educate.v.01, Prepare.v.05, Teach.v.01)"
       }
      ],
      "verb": "Teach (Educate.v.01, Prepare.v.05, Teach.v.01)"
     },
     {
      "id": "activities-training-114",
      "label": "training",
      "synset": "training.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Train (Train.v.01)"
     },
     {
      "id": "activities-lecture-educational-address-115",
      "label": "lecture (educational address)",
      "synset": "lecture.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-lesson-116",
        "label": "lesson",
        "synset": "lesson.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Teach (Educate.v.01, Prepare.v.05, Teach.v.01)"
       }
      ],
      "verb": "Address (express) (Address.v.02, Deliver.v.01)"
     }
    ]
   },
   {
    "id": "activities-get-information-evaluate-117",
    "label": "Get information > Evaluate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-measurement-118",
      "label": "measurement",
      "synset": "measurement.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-test-measurement-procedure-119",
        "label": "test (measurement procedure)",
        "synset": "test.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Test (Test.v.01)"
       },
       {
        "id": "activities-surveying-120",
        "label": "surveying",
        "synset": "surveying.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Survey (Survey.v.02, Survey.v.05)"
       },
       {
        "id": "activities-dosimetry-121",
        "label": "dosimetry",
        "synset": "dosimetry.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Measure (Measure.v.04, Quantify.v.02)"
       },
       {
        "id": "activities-sounding-122",
        "label": "sounding",
        "synset": "sounding.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Measure (Measure.v.04, Quantify.v.02)"
       }
      ],
      "verb": "Measure (Measure.v.04, Quantify.v.02)"
     },
     {
      "id": "activities-judgment-123",
      "label": "judgment",
      "synset": "judgment.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-adjudication-124",
        "label": "adjudication",
        "synset": "adjudication.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Evaluate (Evaluate.v.02)"
       },
       {
        "id": "activities-appraisal-125",
        "label": "appraisal",
        "synset": "appraisal.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Evaluate (Evaluate.v.02)"
       }
      ],
      "verb": "Evaluate (Evaluate.v.02)"
     },
     {
      "id": "activities-test-trial-attempt-126",
      "label": "test (trial/attempt)",
      "synset": "test.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Test (Test.v.01)"
     }
    ]
   },
   {
    "id": "activities-get-information-perceive-observe-127",
    "label": "Get information > Perceive > Observe",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-observation-single-act-128",
      "label": "observation (single act)",
      "synset": "observation.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Observe (Detect.v.01, Observe.v.04)"
     }
    ]
   },
   {
    "id": "activities-get-information-perceive-keep-watch-129",
    "label": "Get information > Perceive > Keep Watch",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-patrol-130",
      "label": "patrol",
      "synset": "patrol.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Keep Watch (Check.v.01, guard.v.01, patrol.v.01, watch.v.02)"
     }
    ]
   },
   {
    "id": "activities-get-information-perceive-monitor-131",
    "label": "Get information > Perceive > Monitor",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-surveillance-132",
      "label": "surveillance",
      "synset": "surveillance.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-watch-133",
        "label": "watch",
        "synset": "watch.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Keep Watch (Check.v.01, guard.v.01, patrol.v.01, watch.v.02)"
       }
      ],
      "verb": "Surveil (Surveil.v.01)"
     },
     {
      "id": "activities-observation-sustained-134",
      "label": "observation (sustained)",
      "synset": "observation.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-monitoring-135",
        "label": "monitoring",
        "synset": "monitoring.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Monitor (Monitor.v.01)"
       },
       {
        "id": "activities-sighting-136",
        "label": "sighting",
        "synset": "sighting.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Spot (Spot.v.02)"
       }
      ],
      "verb": "Monitor (Monitor.v.01)"
     }
    ]
   },
   {
    "id": "activities-get-information-perceive-search-137",
    "label": "Get information > Perceive > Search",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-search-perceptual-seeking-138",
      "label": "search (perceptual seeking)",
      "synset": "search.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-exploration-139",
        "label": "exploration",
        "synset": "exploration.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Search (Look.v.01, Search.v.01, Search.v.02)"
       },
       {
        "id": "activities-shakedown-140",
        "label": "shakedown",
        "synset": "shakedown.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Search (Look.v.01, Search.v.01, Search.v.02)"
       }
      ],
      "verb": "Search (Look.v.01, Search.v.01, Search.v.02)"
     }
    ]
   },
   {
    "id": "activities-get-information-perceive-find-141",
    "label": "Get information > Perceive > Find",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-search-investigative-work-142",
      "label": "search (investigative work)",
      "synset": "search.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Find (Find.v.03, locate.v.01)"
     }
    ]
   },
   {
    "id": "activities-provide-information-express-live-143",
    "label": "Provide information > Express Live",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-portrayal-144",
      "label": "portrayal",
      "synset": "portrayal.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Act (Perform, e.g. in a play) (Act.v.03)"
     },
     {
      "id": "activities-rendition-145",
      "label": "rendition",
      "synset": "rendition.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Interpret (Interpret.v.03)"
     },
     {
      "id": "activities-magic-trick-146",
      "label": "magic trick",
      "synset": "magic_trick.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Act (Perform, e.g. in a play) (Act.v.03)"
     },
     {
      "id": "activities-dancing-147",
      "label": "dancing",
      "synset": "dancing.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Dance (Dance.v.02)"
     }
    ]
   },
   {
    "id": "activities-provide-information-express-live-talk-148",
    "label": "Provide information > Express Live > Talk",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-lecture-one-directional-address-149",
      "label": "lecture (one-directional address)",
      "synset": "lecture.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-talk-150",
        "label": "talk",
        "synset": "talk.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Talk (Talk.v.02)"
       }
      ],
      "verb": "Talk (Talk.v.02)"
     },
     {
      "id": "activities-provide-information-express-live-talk-address-express-151",
      "label": "Provide information > Express Live > Talk > Address  (express)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-address-152",
        "label": "address",
        "synset": "address.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-recitation-153",
          "label": "recitation",
          "synset": "recitation.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Read (out loud) (Read.v.03)"
         },
         {
          "id": "activities-sermon-154",
          "label": "sermon",
          "synset": "sermon.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Talk (Talk.v.02)"
         }
        ],
        "verb": "Address (express) (Address.v.02, Deliver.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-provide-information-send-information-155",
    "label": "Provide information > Send information",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-mail-156",
      "label": "mail",
      "synset": "mail.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Relay (Relay.v.01)"
     },
     {
      "id": "activities-referral-157",
      "label": "referral",
      "synset": "referral.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Refer (Refer.v.04)"
     }
    ]
   },
   {
    "id": "activities-provide-information-send-information-inform-158",
    "label": "Provide information > Send information > Inform",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-disclosure-159",
      "label": "disclosure",
      "synset": "disclosure.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-discovery-160",
        "label": "discovery",
        "synset": "discovery.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Disclose (Unwrap.v.02)"
       }
      ],
      "verb": "Disclose (Unwrap.v.02)"
     },
     {
      "id": "activities-narration-161",
      "label": "narration",
      "synset": "narration.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Describe (Describe.v.01)"
     },
     {
      "id": "activities-telling-162",
      "label": "telling",
      "synset": "telling.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-warning-163",
        "label": "warning",
        "synset": "warning.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-threat-164",
          "label": "threat",
          "synset": "threat.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Warn (Caution.v.01, Warn.v.01)"
         }
        ],
        "verb": "Warn (Caution.v.01, Warn.v.01)"
       }
      ],
      "verb": "Convey (Convey.v.01)"
     },
     {
      "id": "activities-briefing-165",
      "label": "briefing",
      "synset": "briefing.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Brief (Brief.v.01)"
     },
     {
      "id": "activities-denial-166",
      "label": "denial",
      "synset": "denial.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Answer (Answer.v.01, Answer.v.10)"
     },
     {
      "id": "activities-complaint-167",
      "label": "complaint",
      "synset": "complaint.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-grievance-168",
        "label": "grievance",
        "synset": "grievance.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Inform (Advise.v.02, Inform.v.01)"
       }
      ],
      "verb": "Inform (Advise.v.02, Inform.v.01)"
     }
    ]
   },
   {
    "id": "activities-provide-information-send-information-inform-announce-advertise-169",
    "label": "Provide information > Send information > Inform > Announce > Advertise",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-advertising-170",
      "label": "advertising",
      "synset": "advertising.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Advertise (Advertise.v.02)"
     }
    ]
   },
   {
    "id": "activities-provide-information-send-information-inform-describe-171",
    "label": "Provide information > Send information > Inform > Describe",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-description-172",
      "label": "description",
      "synset": "characterization.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Characterize (Qualify.v.06)"
     }
    ]
   },
   {
    "id": "activities-provide-information-send-information-ask-question-173",
    "label": "Provide information > Send information > Ask > Question",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-question-174",
      "label": "question",
      "synset": "question.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-interrogation-175",
        "label": "interrogation",
        "synset": "interview.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-deposition-testimony-176",
          "label": "deposition (testimony)",
          "synset": "deposition.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Testify (Testify.v.01, Testify.v.02)"
         }
        ],
        "verb": "Interview (Interview.v.01, Interview.v.02)"
       }
      ],
      "verb": "Question (Question.v.03)"
     }
    ]
   },
   {
    "id": "activities-provide-information-send-information-request-177",
    "label": "Provide information > Send information > Request",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-request-178",
      "label": "request",
      "synset": "request.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-order-authoritative-request-179",
        "label": "order (authoritative request)",
        "synset": "order.n.13",
        "virtual": false,
        "status": "none",
        "verb": "Request (Request.v.01, Request.v.02)"
       },
       {
        "id": "activities-call-request-for-presence-180",
        "label": "call (request for presence)",
        "synset": "call.n.09",
        "virtual": false,
        "status": "none",
        "verb": "Call (Call.v.05)"
       },
       {
        "id": "activities-charge-formal-accusation-181",
        "label": "charge (formal accusation)",
        "synset": "charge.n.11",
        "virtual": false,
        "status": "none",
        "verb": "File (formal) (File.v.01)"
       }
      ],
      "verb": "Request (Request.v.01, Request.v.02)"
     },
     {
      "id": "activities-provide-information-send-information-request-apply-for-182",
      "label": "Provide information > Send information > Request > Apply  (for)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-application-183",
        "label": "application",
        "synset": "application.n.07",
        "virtual": false,
        "status": "none",
        "verb": "Apply (for) (Apply.v.03)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-provide-information-send-information-inform-order-authoritative-speech-act-184",
    "label": "Provide information > Send information > Inform > Order (authoritative) [speech act]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-command-185",
      "label": "command",
      "synset": "command.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-summons-186",
        "label": "summons",
        "synset": "summons.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Dispatch (Dispatch.v.01)"
       }
      ],
      "verb": "Order (authoritative) (Order.v.01)"
     }
    ]
   },
   {
    "id": "activities-provide-information-show-present-187",
    "label": "Provide information > Show > Present",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-presentation-188",
      "label": "presentation",
      "synset": "presentation.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Present (Present.v.02, Present.v.05, Show.v.01)"
     }
    ]
   },
   {
    "id": "activities-provide-information-show-189",
    "label": "Provide information > Show",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-display-190",
      "label": "display",
      "synset": "display.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Show (Expose.v.03, Show.v.04)"
     }
    ]
   },
   {
    "id": "activities-provide-information-send-information-new-dispute-object-191",
    "label": "Provide information > Send information > [new: Dispute / Object]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-dispute-192",
      "label": "dispute",
      "synset": "dispute.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Debate (Debate.v.01, Hash_out.v.01)"
     },
     {
      "id": "activities-affray-193",
      "label": "affray",
      "synset": "affray.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Debate (Debate.v.01, Hash_out.v.01)"
     }
    ]
   },
   {
    "id": "activities-2-physical-activities-194",
    "label": "2. Physical Activities",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-2-1-create-physical-objects-195",
    "label": "2.1 Create Physical Objects",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-assemble-construct-physical-196",
      "label": "Assemble > Construct  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-construction-197",
        "label": "construction",
        "synset": "construction.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-fabrication-fitting-parts-198",
          "label": "fabrication (fitting parts)",
          "synset": "fabrication.n.04",
          "virtual": false,
          "status": "none",
          "verb": "Fabricate (Manufacture.v.01, Produce.v.01)"
         }
        ],
        "verb": "Construct (physical) (Construct.v.01, Raise.v.09)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-fabricate-199",
    "label": "Fabricate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-fabrication-from-raw-materials-200",
      "label": "fabrication (from raw materials)",
      "synset": "fabrication.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-forging-201",
        "label": "forging",
        "synset": "forging.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Fabricate (Manufacture.v.01, Produce.v.01)"
       }
      ],
      "verb": "Fabricate (Manufacture.v.01, Produce.v.01)"
     },
     {
      "id": "activities-production-202",
      "label": "production",
      "synset": "production.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-breeding-203",
        "label": "breeding",
        "synset": "breeding.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Fabricate (Manufacture.v.01, Produce.v.01)"
       },
       {
        "id": "activities-culture-biological-204",
        "label": "culture (biological)",
        "synset": "culture.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Fabricate (Manufacture.v.01, Produce.v.01)"
       },
       {
        "id": "activities-crop-205",
        "label": "crop",
        "synset": "crop.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Fabricate (Manufacture.v.01, Produce.v.01)"
       }
      ],
      "verb": "Fabricate (Manufacture.v.01, Produce.v.01)"
     }
    ]
   },
   {
    "id": "activities-new-create-by-chemical-reaction-206",
    "label": "[new]  Create by chemical reaction",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-chemical-reaction-207",
      "label": "chemical reaction",
      "synset": "chemical_reaction.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-fire-combustion-reaction-208",
        "label": "fire (combustion reaction)",
        "synset": "fire.n.03",
        "virtual": false,
        "status": "none",
        "verb": "[new] Create by chemical reaction"
       }
      ],
      "verb": "[new] Create by chemical reaction"
     }
    ]
   },
   {
    "id": "activities-2-2-modify-physical-objects-209",
    "label": "2.2 Modify Physical Objects",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-service-physical-repair-physical-210",
      "label": "Service (physical) > Repair  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-repair-211",
        "label": "repair",
        "synset": "repair.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-overhaul-212",
          "label": "overhaul",
          "synset": "overhaul.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Overhaul (Overhaul.v.02)"
         },
         {
          "id": "activities-rehabilitation-213",
          "label": "rehabilitation",
          "synset": "rehabilitation.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Restore (Restore.v.01)"
         },
         {
          "id": "activities-reforestation-214",
          "label": "reforestation",
          "synset": "reforestation.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Restore (Restore.v.01)"
         }
        ],
        "verb": "Repair (physical) (Correct.v.01, Correct.v.08, Repair.v.01)"
       }
      ]
     },
     {
      "id": "activities-service-physical-maintain-physical-215",
      "label": "Service (physical) > Maintain  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-care-maintenance-216",
        "label": "care (maintenance)",
        "synset": "care.n.06",
        "virtual": false,
        "status": "none",
        "verb": "Maintain (physical) (Conserve.v.02, Keep.v.01)"
       }
      ]
     },
     {
      "id": "activities-service-physical-replace-physical-217",
      "label": "Service (physical) > Replace  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-replacement-218",
        "label": "replacement",
        "synset": "replacement.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Replace (physical) (Replace.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-transform-physical-objects-change-surface-219",
    "label": "Transform physical objects > Change surface",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-decoration-220",
      "label": "decoration",
      "synset": "decoration.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-marking-221",
        "label": "marking",
        "synset": "marking.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Mark (physical) (Mark.v.02)"
       },
       {
        "id": "activities-ornamentation-222",
        "label": "ornamentation",
        "synset": "ornamentation.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Decorate (Decorate.v.01)"
       },
       {
        "id": "activities-trimming-223",
        "label": "trimming",
        "synset": "trimming.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Smooth (Smooth.v.01)"
       }
      ],
      "verb": "Decorate (Decorate.v.01)"
     },
     {
      "id": "activities-coloring-224",
      "label": "coloring",
      "synset": "coloring.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Color (Color.v.01)"
     },
     {
      "id": "activities-contamination-225",
      "label": "contamination",
      "synset": "contamination.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Change surface (Change_surface.v.01)"
     },
     {
      "id": "activities-facial-226",
      "label": "facial",
      "synset": "facial.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Change surface (Change_surface.v.01)"
     },
     {
      "id": "activities-impression-stamping-227",
      "label": "impression (stamping)",
      "synset": "impression.n.09",
      "virtual": false,
      "status": "none",
      "verb": "Impress (Impress.v.04)"
     },
     {
      "id": "activities-transform-physical-objects-clean-physical-228",
      "label": "Transform physical objects > Clean  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-cleaning-229",
        "label": "cleaning",
        "synset": "cleaning.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Clean (physical) (Clean.v.01, Clean.v.02)"
       }
      ]
     },
     {
      "id": "activities-transform-physical-objects-adjust-physical-230",
      "label": "Transform physical objects > Adjust  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-adjustment-231",
        "label": "adjustment",
        "synset": "adjustment.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Adjust (physical) (Adjust.v.01)"
       },
       {
        "id": "activities-upgrade-232",
        "label": "upgrade",
        "synset": "upgrade.n.06",
        "virtual": false,
        "status": "none",
        "verb": "Upgrade (Upgrade.v.02)"
       }
      ]
     },
     {
      "id": "activities-transform-physical-objects-adjust-physical-align-physical-233",
      "label": "Transform physical objects > Adjust (physical) > Align  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-alignment-234",
        "label": "alignment",
        "synset": "alignment.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Align (physical) (Align.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-transform-physical-objects-adjust-physical-calibrate-235",
    "label": "Transform physical objects > Adjust (physical) > Calibrate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-calibration-236",
      "label": "calibration",
      "synset": "calibration.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Calibrate (Calibrate.v.01)"
     },
     {
      "id": "activities-transform-physical-objects-adjust-physical-synchronize-physical-237",
      "label": "Transform physical objects > Adjust (physical) > Synchronize  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-coordination-238",
        "label": "coordination",
        "synset": "coordination.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Synchronize (physical) (Synchronize.v.01, Synchronize.v.03, Synchronize.v.04)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-transform-physical-objects-adjust-physical-reduce-239",
    "label": "Transform physical objects > Adjust (physical) > Reduce",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-depletion-240",
      "label": "depletion",
      "synset": "depletion.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-consumption-depletion-241",
        "label": "consumption (depletion)",
        "synset": "consumption.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Reduce (Reduce.v.01)"
       }
      ],
      "verb": "Reduce (Reduce.v.01)"
     },
     {
      "id": "activities-easing-242",
      "label": "easing",
      "synset": "easing.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Reduce (Reduce.v.01)"
     },
     {
      "id": "activities-trim-243",
      "label": "trim",
      "synset": "trim.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Reduce (Reduce.v.01)"
     },
     {
      "id": "activities-discount-price-reduction-244",
      "label": "discount (price reduction)",
      "synset": "discount.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Decrease (Decrease.v.01)"
     },
     {
      "id": "activities-transform-physical-objects-adjust-physical-extend-physical-245",
      "label": "Transform physical objects > Adjust (physical) > Extend  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-expansion-246",
        "label": "expansion",
        "synset": "expansion.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-tension-stretched-state-247",
          "label": "tension (stretched state)",
          "synset": "tension.n.06",
          "virtual": false,
          "status": "none",
          "verb": "Extend (physical) (Expand.v.02, Extend.v.17, Widen.v.04)"
         }
        ],
        "verb": "Extend (physical) (Expand.v.02, Extend.v.17, Widen.v.04)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-transform-physical-objects-heat-248",
    "label": "Transform physical objects > Heat",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-cooking-249",
      "label": "cooking",
      "synset": "cooking.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-cuisine-250",
        "label": "cuisine",
        "synset": "cuisine.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Cook (Cook.v.02, Cook.v.03)"
       }
      ],
      "verb": "Cook (Cook.v.02, Cook.v.03)"
     },
     {
      "id": "activities-cremation-251",
      "label": "cremation",
      "synset": "cremation.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Heat (Heat.v.01)"
     },
     {
      "id": "activities-heat-natural-thermal-process-252",
      "label": "heat (natural thermal process)",
      "synset": "heat.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-transform-physical-objects-prepare-physical-253",
      "label": "Transform physical objects > Prepare  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-preparation-254",
        "label": "preparation",
        "synset": "preparation.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Prepare (physical) (Fix.v.12)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-new-harden-255",
    "label": "[new]  Harden",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-hardening-256",
      "label": "hardening",
      "synset": "hardening.n.02",
      "virtual": false,
      "status": "none",
      "verb": "[new] Harden"
     }
    ]
   },
   {
    "id": "activities-combine-physical-objects-257",
    "label": "Combine physical objects",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-combination-258",
      "label": "combination",
      "synset": "combination.n.07",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-consolidation-259",
        "label": "consolidation",
        "synset": "consolidation.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Consolidate (Consolidate.v.01)"
       }
      ],
      "verb": "Combine physical objects (Create_from_raw_material.v.01)"
     },
     {
      "id": "activities-combine-physical-objects-synthesize-physical-blend-physical-260",
      "label": "Combine physical objects > Synthesize (physical) > Blend  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-blend-261",
        "label": "blend",
        "synset": "blend.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Blend (physical) (Blend.v.01, Blend.v.03)"
       },
       {
        "id": "activities-mix-262",
        "label": "mix",
        "synset": "mix.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Blend (physical) (Blend.v.01, Blend.v.03)"
       }
      ]
     },
     {
      "id": "activities-combine-physical-objects-add-physical-263",
      "label": "Combine physical objects > Add  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-addition-264",
        "label": "addition",
        "synset": "addition.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Add (physical) (Add.v.01, Include.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-move-physical-objects-put-physical-objects-265",
    "label": "Move physical objects > Put physical objects",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-placement-266",
      "label": "placement",
      "synset": "placement.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Put physical objects (Put.v.01)"
     },
     {
      "id": "activities-installation-267",
      "label": "installation",
      "synset": "installation.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Install (physical) (Install.v.01)"
     },
     {
      "id": "activities-move-physical-objects-put-physical-objects-insert-physical-268",
      "label": "Move physical objects > Put physical objects > Insert  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-insertion-269",
        "label": "insertion",
        "synset": "insertion.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-cannulation-270",
          "label": "cannulation",
          "synset": "cannulation.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Insert (physical) (Feed.v.04, Insert.v.01)"
         },
         {
          "id": "activities-transfusion-271",
          "label": "transfusion",
          "synset": "transfusion.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Insert (physical) (Feed.v.04, Insert.v.01)"
         }
        ],
        "verb": "Insert (physical) (Feed.v.04, Insert.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-move-physical-objects-put-physical-objects-load-272",
    "label": "Move physical objects > Put physical objects > Load",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-loading-273",
      "label": "loading",
      "synset": "loading.n.05",
      "virtual": false,
      "status": "none",
      "verb": "Load (physical) (Load.v.01)"
     }
    ]
   },
   {
    "id": "activities-move-physical-objects-put-physical-objects-unload-274",
    "label": "Move physical objects > Put physical objects > Unload",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-unloading-275",
      "label": "unloading",
      "synset": "unloading.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Unload (Drop.v.08)"
     }
    ]
   },
   {
    "id": "activities-move-physical-objects-put-physical-objects-support-276",
    "label": "Move physical objects > Put physical objects > Support",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-support-physical-277",
      "label": "support (physical)",
      "synset": "support.n.08",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-shoring-278",
        "label": "shoring",
        "synset": "shoring.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Support (Hold.v.10)"
       }
      ],
      "verb": "Support (Hold.v.10)"
     }
    ]
   },
   {
    "id": "activities-move-physical-objects-put-physical-objects-park-279",
    "label": "Move physical objects > Put physical objects > Park",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-parking-280",
      "label": "parking",
      "synset": "parking.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Park (Park.v.02)"
     }
    ]
   },
   {
    "id": "activities-move-physical-objects-handle-281",
    "label": "Move physical objects > Handle",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-handling-282",
      "label": "handling",
      "synset": "handling.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Handle (Handle.v.04)"
     },
     {
      "id": "activities-move-physical-objects-apply-physical-283",
      "label": "Move physical objects > Apply  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-application-applying-substance-284",
        "label": "application (applying substance)",
        "synset": "application.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-lubrication-285",
          "label": "lubrication",
          "synset": "lubrication.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Lubricate (Lubricate.v.02)"
         }
        ],
        "verb": "Apply (physical) (Put_on.v.07)"
       },
       {
        "id": "activities-wiring-286",
        "label": "wiring",
        "synset": "wiring.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Wire (Wire.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-move-physical-objects-move-physical-objects-in-other-ways-shake-287",
    "label": "Move physical objects > Move physical objects in other ways > Shake",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-vibration-288",
      "label": "vibration",
      "synset": "vibration.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Shake (Shake.v.01, Vibrate.v.01)"
     },
     {
      "id": "activities-disturbance-289",
      "label": "disturbance",
      "synset": "disturbance.n.05",
      "virtual": false,
      "status": "none",
      "verb": "Shake (Shake.v.01, Vibrate.v.01)"
     },
     {
      "id": "activities-suction-natural-pressure-driven-movement-290",
      "label": "suction (natural pressure-driven movement)",
      "synset": "suction.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Shake (Shake.v.01, Vibrate.v.01)"
     }
    ]
   },
   {
    "id": "activities-move-physical-objects-move-physical-objects-in-other-ways-291",
    "label": "Move physical objects > Move physical objects in other ways",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-gesture-292",
      "label": "gesture",
      "synset": "gesture.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Handle (Handle.v.04)"
     },
     {
      "id": "activities-throw-293",
      "label": "throw",
      "synset": "throw.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Push (Push.v.01)"
     },
     {
      "id": "activities-exercise-physical-bodily-activity-294",
      "label": "exercise (physical bodily activity)",
      "synset": "exercise.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Exercise (Exercise.v.03, Exercise.v.04)"
     },
     {
      "id": "activities-rotation-spontaneous-mechanical-295",
      "label": "rotation (spontaneous/mechanical)",
      "synset": "rotation.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Turn (rotate) (Revolve.v.01, Turn.v.01, Turn.v.17)"
     },
     {
      "id": "activities-separate-physical-objects-cut-physical-296",
      "label": "Separate physical objects > Cut  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-cut-297",
        "label": "cut",
        "synset": "cut.n.17",
        "virtual": false,
        "status": "none",
        "verb": "Cut (physical) (Cut.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-separate-physical-objects-cut-physical-bore-298",
    "label": "Separate physical objects > Cut (physical) > Bore",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-drilling-299",
      "label": "drilling",
      "synset": "drilling.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Bore (Bore.v.02)"
     }
    ]
   },
   {
    "id": "activities-separate-physical-objects-cut-physical-incise-300",
    "label": "Separate physical objects > Cut (physical) > Incise",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-incision-301",
      "label": "incision",
      "synset": "incision.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Incise (Incise.v.01)"
     }
    ]
   },
   {
    "id": "activities-separate-physical-objects-cut-physical-perforate-pierce-302",
    "label": "Separate physical objects > Cut (physical) > Perforate > Pierce",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-puncture-303",
      "label": "puncture",
      "synset": "puncture.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-prick-304",
        "label": "prick",
        "synset": "prick.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Pierce (Pierce.v.04)"
       },
       {
        "id": "activities-venipuncture-305",
        "label": "venipuncture",
        "synset": "venipuncture.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Pierce (Pierce.v.04)"
       }
      ],
      "verb": "Pierce (Pierce.v.04)"
     }
    ]
   },
   {
    "id": "activities-separate-physical-objects-break-explode-306",
    "label": "Separate physical objects > Break > Explode",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-detonation-307",
      "label": "detonation",
      "synset": "detonation.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Explode (Explode.v.01)"
     }
    ]
   },
   {
    "id": "activities-separate-physical-objects-break-308",
    "label": "Separate physical objects > Break",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-fracture-309",
      "label": "fracture",
      "synset": "fracture.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Break (Break.v.02, Sever.v.01)"
     }
    ]
   },
   {
    "id": "activities-separate-physical-objects-disassemble-310",
    "label": "Separate physical objects > Disassemble",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-dismantling-311",
      "label": "dismantling",
      "synset": "dismantling.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Disassemble (Disassemble.v.01)"
     },
     {
      "id": "activities-separate-physical-objects-remove-physical-312",
      "label": "Separate physical objects > Remove  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-removal-313",
        "label": "removal",
        "synset": "removal.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-drain-314",
          "label": "drain",
          "synset": "drain.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Drain (Drain.v.03)"
         },
         {
          "id": "activities-dermabrasion-315",
          "label": "dermabrasion",
          "synset": "dermabrasion.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Remove (physical) (Remove.v.01)"
         },
         {
          "id": "activities-extraction-316",
          "label": "extraction",
          "synset": "extraction.n.03",
          "virtual": false,
          "status": "none",
          "verb": "Extract (Draw.v.07, Extract.v.01)"
         }
        ],
        "verb": "Remove (physical) (Remove.v.01)"
       },
       {
        "id": "activities-disposal-317",
        "label": "disposal",
        "synset": "disposal.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Discard (Discard.v.01, Dump.v.01)"
       },
       {
        "id": "activities-release-318",
        "label": "release",
        "synset": "release.n.03",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-radiation-released-energy-319",
          "label": "radiation (released energy)",
          "synset": "radiation.n.04",
          "virtual": false,
          "status": "none",
          "verb": "Release (Free.v.01, Let_go_of.v.01, Turn.v.08)"
         }
        ],
        "verb": "Release (Free.v.01, Let_go_of.v.01, Turn.v.08)"
       },
       {
        "id": "activities-excavation-320",
        "label": "excavation",
        "synset": "excavation.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Excavate (Excavate.v.01)"
       },
       {
        "id": "activities-extermination-321",
        "label": "extermination",
        "synset": "extermination.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Demolish (Demolish.v.01, Destroy.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-2-3-store-physical-objects-322",
    "label": "2.3 Store Physical Objects",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-storage-physical-323",
      "label": "storage (physical)",
      "synset": "storage.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-repositing-324",
        "label": "repositing",
        "synset": "repositing.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Store physical objects (Conserve.v.02, Store.v.01, Store.v.02)"
       }
      ],
      "verb": "Store information (Conserve.v.02, Store.v.01, Store.v.02)"
     }
    ]
   },
   {
    "id": "activities-preserve-325",
    "label": "Preserve",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-preservation-326",
      "label": "preservation",
      "synset": "preservation.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-conservation-327",
        "label": "conservation",
        "synset": "conservation.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Preserve (Preserve.v.04)"
       }
      ],
      "verb": "Preserve (Preserve.v.04)"
     }
    ]
   },
   {
    "id": "activities-new-contain-328",
    "label": "[new]  Contain",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-containment-329",
      "label": "containment",
      "synset": "containment.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Restrain (Restrain.v.01, Restrain.v.03)"
     }
    ]
   },
   {
    "id": "activities-new-waterproof-330",
    "label": "[new]  Waterproof",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-waterproofing-331",
      "label": "waterproofing",
      "synset": "waterproofing.n.01",
      "virtual": false,
      "status": "none",
      "verb": "[new] Waterproof"
     }
    ]
   },
   {
    "id": "activities-2-4-transfer-physical-objects-332",
    "label": "2.4 Transfer Physical Objects",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-transport-physical-objects-deliver-333",
    "label": "Transport physical objects > [Deliver]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-transportation-movement-334",
      "label": "transportation (movement)",
      "synset": "transportation.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-delivery-to-destination-335",
        "label": "delivery (to destination)",
        "synset": "delivery.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-service-delivery-utility-336",
          "label": "service (delivery utility)",
          "synset": "service.n.13",
          "virtual": false,
          "status": "none",
          "verb": "Deliver (Deliver.v.02)"
         }
        ],
        "verb": "Deliver (Deliver.v.02)"
       }
      ],
      "verb": "Transport physical objects (Transfer.v.02, Transport.v.01, Transport.v.04)"
     }
    ]
   },
   {
    "id": "activities-transport-physical-objects-travel-visit-337",
    "label": "Transport physical objects > [Travel] > Visit",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-visit-338",
      "label": "visit",
      "synset": "visit.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Visit (Visit.v.01)"
     }
    ]
   },
   {
    "id": "activities-transport-physical-objects-travel-339",
    "label": "Transport physical objects > [Travel]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-arrival-340",
      "label": "arrival",
      "synset": "arrival.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-appearance-coming-into-view-341",
        "label": "appearance (coming into view)",
        "synset": "appearance.n.05",
        "virtual": false,
        "status": "none",
        "verb": "Appear (Appear.v.07)"
       },
       {
        "id": "activities-entrance-342",
        "label": "entrance",
        "synset": "entrance.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Enter (Enter.v.01)"
       }
      ],
      "verb": "Travel (Travel.v.01)"
     },
     {
      "id": "activities-departure-343",
      "label": "departure",
      "synset": "departure.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Travel (Travel.v.01)"
     }
    ]
   },
   {
    "id": "activities-transport-physical-objects-carry-haul-344",
    "label": "Transport physical objects > [Carry] > Haul",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-hauling-345",
      "label": "hauling",
      "synset": "hauling.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Haul (Haul.v.02)"
     }
    ]
   },
   {
    "id": "activities-transport-physical-objects-346",
    "label": "Transport physical objects",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-transportation-commercial-shipping-347",
      "label": "transportation (commercial shipping)",
      "synset": "transportation.n.05",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-logistics-348",
        "label": "logistics",
        "synset": "logistics.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Transport physical objects (Transfer.v.02, Transport.v.01, Transport.v.04)"
       }
      ],
      "verb": "Transport physical objects (Transfer.v.02, Transport.v.01, Transport.v.04)"
     },
     {
      "id": "activities-get-physical-objects-gather-physical-349",
      "label": "Get physical objects > Gather  (physical)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-collection-350",
        "label": "collection",
        "synset": "collection.n.04",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-gather-351",
          "label": "gather",
          "synset": "gather.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Gather (physical) (Gather.v.01)"
         },
         {
          "id": "activities-harvest-352",
          "label": "harvest",
          "synset": "harvest.n.03",
          "virtual": false,
          "status": "none",
          "verb": "Harvest (Harvest.v.02, Reap.v.01)"
         },
         {
          "id": "activities-pickup-353",
          "label": "pickup",
          "synset": "pickup.n.08",
          "virtual": false,
          "status": "none",
          "verb": "Pick up (for transport) (Collect.v.05, Pick.v.01, Pick_Up.v.03)"
         }
        ],
        "verb": "Collect (physical) (Roll_up.v.02)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-get-physical-objects-buy-354",
    "label": "Get physical objects > Buy",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-acquisition-355",
      "label": "acquisition",
      "synset": "acquisition.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-purchase-356",
        "label": "purchase",
        "synset": "purchase.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-buying-357",
          "label": "buying",
          "synset": "buying.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Buy (Buy.v.01, Cash.v.01, Shop.v.01, Shop.v.03)"
         }
        ],
        "verb": "Buy (Buy.v.01, Cash.v.01, Shop.v.01, Shop.v.03)"
       }
      ],
      "verb": "Buy (Buy.v.01, Cash.v.01, Shop.v.01, Shop.v.03)"
     }
    ]
   },
   {
    "id": "activities-get-physical-objects-take-capture-358",
    "label": "Get physical objects > Take > Capture",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-apprehension-359",
      "label": "apprehension",
      "synset": "apprehension.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Capture (catch) (Capture.v.06)"
     }
    ]
   },
   {
    "id": "activities-get-physical-objects-take-recover-360",
    "label": "Get physical objects > Take > Recover",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-repossession-361",
      "label": "repossession",
      "synset": "repossession.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Recover (Recover.v.01)"
     }
    ]
   },
   {
    "id": "activities-get-physical-objects-receive-362",
    "label": "Get physical objects > Receive",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-reception-363",
      "label": "reception",
      "synset": "reception.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Receive (Accept.v.02, Receive.v.01, Stock.v.05)"
     }
    ]
   },
   {
    "id": "activities-provide-physical-objects-provide-food-364",
    "label": "Provide physical objects > Provide food",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-feeding-365",
      "label": "feeding",
      "synset": "feeding.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Provide food (Feed.v.01, Feed.v.02)"
     }
    ]
   },
   {
    "id": "activities-provide-physical-objects-new-supply-366",
    "label": "Provide physical objects > [new: Supply]",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-provision-367",
      "label": "provision",
      "synset": "provision.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-supply-368",
        "label": "supply",
        "synset": "supply.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Supply (Supply.v.01)"
       },
       {
        "id": "activities-fueling-369",
        "label": "fueling",
        "synset": "fueling.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Fuel (Fuel.v.02)"
       },
       {
        "id": "activities-irrigation-land-370",
        "label": "irrigation (land)",
        "synset": "irrigation.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Supply (Supply.v.01)"
       }
      ],
      "verb": "Supply (Supply.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-physical-objects-exchange-physical-objects-371",
    "label": "Transfer physical objects > Exchange physical objects",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-transaction-372",
      "label": "transaction",
      "synset": "transaction.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-exchange-373",
        "label": "exchange",
        "synset": "exchange.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Exchange physical objects (Change.v.06, Exchange.v.04)"
       },
       {
        "id": "activities-deal-374",
        "label": "deal",
        "synset": "deal.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Trade (Transfer both ways) (Exchange.v.01, Trade.v.01)"
       },
       {
        "id": "activities-transfer-375",
        "label": "transfer",
        "synset": "transfer.n.06",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-delivery-conveyance-376",
          "label": "delivery (conveyance)",
          "synset": "delivery.n.04",
          "virtual": false,
          "status": "none",
          "verb": "Deliver (Deliver.v.02)"
         }
        ],
        "verb": "Exchange physical objects (Change.v.06, Exchange.v.04)"
       }
      ],
      "verb": "Trade (Transfer both ways) (Exchange.v.01, Trade.v.01)"
     },
     {
      "id": "activities-trade-exchange-377",
      "label": "trade (exchange)",
      "synset": "trade.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Trade (Transfer both ways) (Exchange.v.01, Trade.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-physical-objects-provide-sell-378",
    "label": "Transfer physical objects > Provide > Sell",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-sale-379",
      "label": "sale",
      "synset": "sale.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-auction-380",
        "label": "auction",
        "synset": "auction.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Sell (Market.v.01, Sell.v.01)"
       },
       {
        "id": "activities-resale-381",
        "label": "resale",
        "synset": "resale.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Sell (Market.v.01, Sell.v.01)"
       }
      ],
      "verb": "Sell (Market.v.01, Sell.v.01)"
     },
     {
      "id": "activities-market-activity-382",
      "label": "market (activity)",
      "synset": "market.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Sell (Market.v.01, Sell.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-physical-objects-provide-give-383",
    "label": "Transfer physical objects > Provide > Give",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-grant-384",
      "label": "grant",
      "synset": "grant.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Grant (Grant.v.05)"
     },
     {
      "id": "activities-financing-385",
      "label": "financing",
      "synset": "financing.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Give (Give.v.03)"
     }
    ]
   },
   {
    "id": "activities-transfer-physical-objects-provide-distribute-386",
    "label": "Transfer physical objects > Provide > Distribute",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-distribution-387",
      "label": "distribution",
      "synset": "distribution.n.03, distribution.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-allotment-388",
        "label": "allotment",
        "synset": "allotment.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Allocate (Allocate.v.01)"
       }
      ],
      "verb": "Distribute (Distribute.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-physical-objects-provide-what-kind-pay-389",
    "label": "Transfer physical objects > [Provide what kind?] > Pay",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-payment-390",
      "label": "payment",
      "synset": "payment.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-spending-391",
        "label": "spending",
        "synset": "spending.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Provide money (Pay.v.01)"
       }
      ],
      "verb": "Provide money (Pay.v.01)"
     }
    ]
   },
   {
    "id": "activities-new-natural-transfer-392",
    "label": "[new]  Natural transfer",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-outflow-393",
      "label": "outflow",
      "synset": "outflow.n.02",
      "virtual": false,
      "status": "none",
      "verb": "[new] Natural transfer (flow)"
     },
     {
      "id": "activities-emission-394",
      "label": "emission",
      "synset": "emission.n.01",
      "virtual": false,
      "status": "none",
      "verb": "[new] Natural transfer (emit)"
     }
    ]
   },
   {
    "id": "activities-3-interactive-activities-395",
    "label": "3. Interactive Activities",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-3-1-act-on-activities-396",
    "label": "3.1 Act on Activities",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-achieve-397",
    "label": "Achieve",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-accomplishment-398",
      "label": "accomplishment",
      "synset": "accomplishment.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-success-achievement-399",
        "label": "success (achievement)",
        "synset": "success.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Achieve (Achieve.v.01)"
       },
       {
        "id": "activities-stunt-400",
        "label": "stunt",
        "synset": "stunt.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Achieve (Achieve.v.01)"
       }
      ],
      "verb": "Achieve (Achieve.v.01)"
     },
     {
      "id": "activities-liberation-401",
      "label": "liberation",
      "synset": "liberation.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Achieve (Achieve.v.01)"
     },
     {
      "id": "activities-complete-activity-402",
      "label": "Complete  (activity)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-termination-403",
        "label": "termination",
        "synset": "termination.n.05",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-completion-404",
          "label": "completion",
          "synset": "completion.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Complete (activity) (Complete.v.01)"
         },
         {
          "id": "activities-fulfillment-405",
          "label": "fulfillment",
          "synset": "fulfillment.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Complete (activity) (Complete.v.01)"
         },
         {
          "id": "activities-closure-406",
          "label": "closure",
          "synset": "closure.n.07",
          "virtual": false,
          "status": "none",
          "verb": "Complete (activity) (Complete.v.01)"
         }
        ],
        "verb": "Complete (activity) (Complete.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-continue-407",
    "label": "Continue",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-follow-up-408",
      "label": "follow-up",
      "synset": "follow-up.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Continue (Continue.v.01)"
     }
    ]
   },
   {
    "id": "activities-improve-409",
    "label": "Improve",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-improvement-agentive-410",
      "label": "improvement (agentive)",
      "synset": "improvement.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-development-agentive-411",
        "label": "development (agentive)",
        "synset": "development.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-advancement-412",
          "label": "advancement",
          "synset": "advancement.n.03",
          "virtual": false,
          "status": "none",
          "verb": "Optimize (Optimize.v.01)"
         }
        ],
        "verb": "Improve (Better.v.02, Enhance.v.02)"
       }
      ],
      "verb": "Improve (Better.v.02, Enhance.v.02)"
     },
     {
      "id": "activities-promotion-413",
      "label": "promotion",
      "synset": "promotion.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Improve (Better.v.02, Enhance.v.02)"
     }
    ]
   },
   {
    "id": "activities-perform-414",
    "label": "Perform",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-operation-operational-activity-415",
      "label": "operation (operational activity)",
      "synset": "operation.n.07",
      "virtual": false,
      "status": "none",
      "verb": "Operate (Operate.v.03, Run.v.19)"
     },
     {
      "id": "activities-procedure-416",
      "label": "procedure",
      "synset": "procedure.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-routine-417",
        "label": "routine",
        "synset": "routine.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Practice (Drill.v.03)"
       }
      ],
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-duty-418",
      "label": "duty",
      "synset": "duty.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-job-specific-duty-419",
        "label": "job (specific duty)",
        "synset": "job.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
       },
       {
        "id": "activities-assignment-assigned-duty-420",
        "label": "assignment (assigned duty)",
        "synset": "assignment.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-mission-421",
          "label": "mission",
          "synset": "mission.n.03",
          "virtual": false,
          "status": "none",
          "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
         }
        ],
        "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
       },
       {
        "id": "activities-function-422",
        "label": "function",
        "synset": "function.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
       }
      ],
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-assignment-educational-work-task-423",
      "label": "assignment (educational/work task)",
      "synset": "assignment.n.05",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-homework-424",
        "label": "homework",
        "synset": "homework.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
       }
      ],
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-paperwork-425",
      "label": "paperwork",
      "synset": "paperwork.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-housework-426",
      "label": "housework",
      "synset": "housework.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-job-completed-piece-of-work-427",
      "label": "job (completed piece of work)",
      "synset": "job.n.06",
      "virtual": false,
      "status": "none",
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-performance-carrying-out-428",
      "label": "performance (carrying out)",
      "synset": "performance.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-action-group-429",
      "label": "action (group)",
      "synset": "action.n.09",
      "virtual": false,
      "status": "none",
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-behavior-430",
      "label": "behavior",
      "synset": "behavior.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-measure-action-taken-431",
      "label": "measure (action taken)",
      "synset": "measure.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-precaution-432",
        "label": "precaution",
        "synset": "precaution.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-security-precautionary-action-433",
          "label": "security (precautionary action)",
          "synset": "security.n.09",
          "virtual": false,
          "status": "none",
          "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
         }
        ],
        "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
       }
      ],
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-economy-avoiding-waste-434",
      "label": "economy (avoiding waste)",
      "synset": "economy.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     },
     {
      "id": "activities-labor-435",
      "label": "labor",
      "synset": "labor.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Perform (action) (Do.v.03, Perform.v.01, Prosecute.v.03, Take.v.01)"
     }
    ]
   },
   {
    "id": "activities-perform-practice-436",
    "label": "Perform > Practice",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-practice-437",
      "label": "practice",
      "synset": "practice.n.01, practice.n.03, practice.n.05",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-habit-438",
        "label": "habit",
        "synset": "habit.n.01, habit.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Practice (Drill.v.03)"
       },
       {
        "id": "activities-convention-439",
        "label": "convention",
        "synset": "convention.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-protocol-440",
          "label": "protocol",
          "synset": "protocol.n.03",
          "virtual": false,
          "status": "none",
          "verb": "Practice (Drill.v.03)"
         }
        ],
        "verb": "Practice (Drill.v.03)"
       }
      ],
      "verb": "Practice (Drill.v.03)"
     }
    ]
   },
   {
    "id": "activities-perform-rehearse-441",
    "label": "Perform > Rehearse",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-rehearsal-442",
      "label": "rehearsal",
      "synset": "rehearsal.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Rehearse (Rehearse.v.01)"
     },
     {
      "id": "activities-exercise-practice-run-443",
      "label": "exercise (practice run)",
      "synset": "exercise.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Rehearse (Rehearse.v.01)"
     }
    ]
   },
   {
    "id": "activities-implement-444",
    "label": "Implement",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-implementation-445",
      "label": "implementation",
      "synset": "implementation.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-means-446",
        "label": "means",
        "synset": "means.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-instrument-447",
          "label": "instrument",
          "synset": "instrument.n.02",
          "virtual": false,
          "status": "none",
          "verb": "Implement (Carry_through.v.01, Follow_through.v.02)"
         }
        ],
        "verb": "Implement (Carry_through.v.01, Follow_through.v.02)"
       }
      ],
      "verb": "Implement (Carry_through.v.01, Follow_through.v.02)"
     }
    ]
   },
   {
    "id": "activities-undertake-448",
    "label": "Undertake",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-campaign-449",
      "label": "campaign",
      "synset": "campaign.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Undertake (Undertake.v.01)"
     }
    ]
   },
   {
    "id": "activities-3-2-transfer-between-actors-450",
    "label": "3.2 Transfer Between Actors",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-transfer-between-actors-get-receive-451",
    "label": "Transfer between actors > Get > Receive",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-reception-social-452",
      "label": "reception (social)",
      "synset": "reception.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Receive (Accept.v.02, Receive.v.01, Stock.v.05)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-get-take-capture-453",
    "label": "Transfer between actors > Get > Take > Capture",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-apprehension-capture-454",
      "label": "apprehension (capture)",
      "synset": "apprehension.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Capture (catch) (Capture.v.06)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-get-take-recover-455",
    "label": "Transfer between actors > Get > Take > Recover",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-repossession-456",
      "label": "repossession",
      "synset": "repossession.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Recover (Recover.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-get-buy-457",
    "label": "Transfer between actors > Get > Buy",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-acquisition-458",
      "label": "acquisition",
      "synset": "acquisition.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-purchase-459",
        "label": "purchase",
        "synset": "purchase.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-buying-460",
          "label": "buying",
          "synset": "buying.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Buy (Buy.v.01, Cash.v.01, Shop.v.01, Shop.v.03)"
         }
        ],
        "verb": "Buy (Buy.v.01, Cash.v.01, Shop.v.01, Shop.v.03)"
       }
      ],
      "verb": "Buy (Buy.v.01, Cash.v.01, Shop.v.01, Shop.v.03)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-get-rent-hire-recruit-461",
    "label": "Transfer between actors > Get > Rent > Hire > Recruit",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-recruitment-462",
      "label": "recruitment",
      "synset": "recruitment.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Recruit (Recruit.v.02)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-provide-sell-463",
    "label": "Transfer between actors > Provide > Sell",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-sale-464",
      "label": "sale",
      "synset": "sale.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-auction-465",
        "label": "auction",
        "synset": "auction.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Sell (Market.v.01, Sell.v.01)"
       },
       {
        "id": "activities-resale-466",
        "label": "resale",
        "synset": "resale.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Sell (Market.v.01, Sell.v.01)"
       }
      ],
      "verb": "Sell (Market.v.01, Sell.v.01)"
     },
     {
      "id": "activities-market-bring-to-buyers-467",
      "label": "market (bring to buyers)",
      "synset": "market.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Sell (Market.v.01, Sell.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-provide-give-468",
    "label": "Transfer between actors > Provide > Give",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-grant-469",
      "label": "grant",
      "synset": "grant.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Grant (Grant.v.05)"
     },
     {
      "id": "activities-financing-470",
      "label": "financing",
      "synset": "financing.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Give (Give.v.03)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-provide-distribute-471",
    "label": "Transfer between actors > Provide > Distribute",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-distribution-472",
      "label": "distribution",
      "synset": "distribution.n.03, distribution.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-allotment-473",
        "label": "allotment",
        "synset": "allotment.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Allocate (Allocate.v.01)"
       }
      ],
      "verb": "Distribute (Distribute.v.01)"
     },
     {
      "id": "activities-deployment-474",
      "label": "deployment",
      "synset": "deployment.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Deploy (Deploy.v.02)"
     },
     {
      "id": "activities-mobilization-475",
      "label": "mobilization",
      "synset": "mobilization.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Deploy (Deploy.v.02)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-exchange-interact-476",
    "label": "Transfer between actors > Exchange > Interact",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-interaction-477",
      "label": "interaction",
      "synset": "interaction.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-relation-478",
        "label": "relation",
        "synset": "relation.n.06",
        "virtual": false,
        "status": "none",
        "verb": "Interact (Interact.v.01)"
       }
      ],
      "verb": "Interact (Interact.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-exchange-trade-transact-479",
    "label": "Transfer between actors > Exchange > Trade > Transact",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-transaction-480",
      "label": "transaction",
      "synset": "transaction.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Trade (Transfer both ways) (Exchange.v.01, Trade.v.01)"
     },
     {
      "id": "activities-exchange-bilateral-481",
      "label": "exchange (bilateral)",
      "synset": "exchange.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Exchange physical objects (Change.v.06, Exchange.v.04)"
     },
     {
      "id": "activities-deal-482",
      "label": "deal",
      "synset": "deal.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Trade (Transfer both ways) (Exchange.v.01, Trade.v.01)"
     },
     {
      "id": "activities-trade-commercial-483",
      "label": "trade (commercial)",
      "synset": "trade.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Trade (Transfer both ways) (Exchange.v.01, Trade.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-between-actors-provide-what-kind-pay-484",
    "label": "Transfer between actors > [Provide what kind?] > Pay",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-payment-485",
      "label": "payment",
      "synset": "payment.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-spending-486",
        "label": "spending",
        "synset": "spending.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Provide money (Pay.v.01)"
       }
      ],
      "verb": "Provide money (Pay.v.01)"
     }
    ]
   },
   {
    "id": "activities-3-3-transfer-service-487",
    "label": "3.3 Transfer Service",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-transfer-service-provide-service-assist-488",
    "label": "Transfer service > Provide service > Assist",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-aid-489",
      "label": "aid",
      "synset": "aid.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-support-sustained-aid-490",
        "label": "support (sustained aid)",
        "synset": "support.n.02",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-blessing-491",
          "label": "blessing",
          "synset": "blessing.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Assist (Help.v.01, Support.v.01, Support.v.02)"
         },
         {
          "id": "activities-adoption-492",
          "label": "adoption",
          "synset": "adoption.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Care (Care.v.02)"
         },
         {
          "id": "activities-attachment-assigned-support-493",
          "label": "attachment (assigned support)",
          "synset": "attachment.n.05",
          "virtual": false,
          "status": "none",
          "verb": "Assist (Help.v.01, Support.v.01, Support.v.02)"
         },
         {
          "id": "activities-sponsorship-494",
          "label": "sponsorship",
          "synset": "sponsorship.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Sponsor (Sponsor.v.01)"
         }
        ],
        "verb": "Assist (Help.v.01, Support.v.01, Support.v.02)"
       },
       {
        "id": "activities-consolation-495",
        "label": "consolation",
        "synset": "consolation.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Comfort (Comfort.v.01)"
       },
       {
        "id": "activities-accommodation-496",
        "label": "accommodation",
        "synset": "accommodation.n.05",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-service-utility-497",
          "label": "service (utility)",
          "synset": "service.n.15",
          "virtual": false,
          "status": "none",
          "verb": "Serve (role) (Serve.v.02)"
         }
        ],
        "verb": "Facilitate (Facilitate.v.01)"
       }
      ],
      "verb": "Assist (Help.v.01, Support.v.01, Support.v.02)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-assist-care-498",
    "label": "Transfer service > Provide service > Assist > Care",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-care-looking-after-wellbeing-499",
      "label": "care (looking after wellbeing)",
      "synset": "care.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-treatment-medical-care-500",
        "label": "treatment (medical care)",
        "synset": "treatment.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Treat (Treat.v.03)"
       }
      ],
      "verb": "Care (Care.v.02)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-assist-treat-501",
    "label": "Transfer service > Provide service > Assist > Treat",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-massage-502",
      "label": "massage",
      "synset": "massage.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Massage (Massage.v.01)"
     },
     {
      "id": "activities-administration-medical-503",
      "label": "administration (medical)",
      "synset": "administration.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-sedation-504",
        "label": "sedation",
        "synset": "sedation.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Anesthetize (Anesthetize.v.01)"
       },
       {
        "id": "activities-injection-505",
        "label": "injection",
        "synset": "injection.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Administer (treat) (Administer.v.04)"
       }
      ],
      "verb": "Administer (treat) (Administer.v.04)"
     },
     {
      "id": "activities-psychotherapy-506",
      "label": "psychotherapy",
      "synset": "psychotherapy.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Treat (Treat.v.03)"
     },
     {
      "id": "activities-radiotherapy-507",
      "label": "radiotherapy",
      "synset": "radiotherapy.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Treat (Treat.v.03)"
     },
     {
      "id": "activities-enema-508",
      "label": "enema",
      "synset": "enema.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Treat (Treat.v.03)"
     },
     {
      "id": "activities-douche-509",
      "label": "douche",
      "synset": "douche.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Treat (Treat.v.03)"
     },
     {
      "id": "activities-irrigation-medical-510",
      "label": "irrigation (medical)",
      "synset": "irrigation.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Treat (Treat.v.03)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-assist-treat-administer-immunize-511",
    "label": "Transfer service > Provide service > Assist > Treat > Administer > Immunize",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-immunization-512",
      "label": "immunization",
      "synset": "immunization.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-inoculation-513",
        "label": "inoculation",
        "synset": "inoculation.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Immunize (Immunize.v.02)"
       }
      ],
      "verb": "Immunize (Immunize.v.02)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-assist-treat-operate-on-514",
    "label": "Transfer service > Provide service > Assist > Treat > Operate on",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-operation-surgical-515",
      "label": "operation (surgical)",
      "synset": "operation.n.06",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-catheterization-516",
        "label": "catheterization",
        "synset": "catheterization.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Operate on (Operate_on.v.01)"
       }
      ],
      "verb": "Operate on (Operate_on.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-assist-rescue-517",
    "label": "Transfer service > Provide service > Assist > Rescue",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-resuscitation-518",
      "label": "resuscitation",
      "synset": "resuscitation.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-cardiopulmonary-resuscitation-519",
        "label": "cardiopulmonary resuscitation",
        "synset": "cardiopulmonary_resuscitation.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Rescue (Rescue.v.01)"
       }
      ],
      "verb": "Rescue (Rescue.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-assist-escort-520",
    "label": "Transfer service > Provide service > Assist > Escort",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-escort-521",
      "label": "escort",
      "synset": "escort.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Escort (Accompany.v.02, Escort.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-assist-facilitate-522",
    "label": "Transfer service > Provide service > Assist > Facilitate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-protection-523",
      "label": "protection",
      "synset": "protection.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Protect (Protect.v.01, Safeguard.v.01)"
     },
     {
      "id": "activities-transfer-service-provide-service-assist-serve-role-524",
      "label": "Transfer service > Provide service > Assist > Serve  (role)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-service-role-525",
        "label": "service (role)",
        "synset": "service.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-facility-526",
          "label": "facility",
          "synset": "facility.n.05",
          "virtual": false,
          "status": "none",
          "verb": "Serve (role) (Serve.v.02)"
         }
        ],
        "verb": "Serve (role) (Serve.v.02)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-entertain-527",
    "label": "Transfer service > Provide service > Entertain",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-entertainment-528",
      "label": "entertainment",
      "synset": "entertainment.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Entertain (Entertain.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-provide-service-follow-comply-529",
    "label": "Transfer service > Provide service > Follow > Comply",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-conformity-530",
      "label": "conformity",
      "synset": "conformity.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Comply (Adhere.v.01, Comply.v.01, Obey.v.01, Satisfy.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-exchange-service-collaborate-agree-531",
    "label": "Transfer service > Exchange service > Collaborate > Agree",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-commitment-532",
      "label": "commitment",
      "synset": "commitment.n.02, commitment.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Agree (Agree.v.01)"
     },
     {
      "id": "activities-transfer-service-exchange-service-collaborate-participate-attend-go-to-533",
      "label": "Transfer service > Exchange service > Collaborate > Participate > Attend  (go to)",
      "synset": null,
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-attendance-534",
        "label": "attendance",
        "synset": "attendance.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Attend (go to) (Attend.v.01)"
       }
      ]
     }
    ]
   },
   {
    "id": "activities-transfer-service-exchange-service-collaborate-participate-535",
    "label": "Transfer service > Exchange service > Collaborate > Participate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-engagement-mutual-involvement-536",
      "label": "engagement (mutual involvement)",
      "synset": "engagement.n.07",
      "virtual": false,
      "status": "none",
      "verb": "Participate (Enter.v.02)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-exchange-service-work-537",
    "label": "Transfer service > Exchange service > Work",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-operation-business-538",
      "label": "operation (business)",
      "synset": "operation.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Work (Work.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-operate-539",
    "label": "Transfer service > Get service > Lead > Control > Operate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-operation-work-military-540",
      "label": "operation (work/military)",
      "synset": "operation.n.03, operation.n.07",
      "virtual": false,
      "status": "none",
      "verb": "Operate (Operate.v.03, Run.v.19)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-manage-541",
    "label": "Transfer service > Get service > Lead > Control > Manage",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-management-542",
      "label": "management",
      "synset": "management.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-supervision-543",
        "label": "supervision",
        "synset": "supervision.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Oversee (Oversee.v.01)"
       },
       {
        "id": "activities-treatment-managerial-544",
        "label": "treatment (managerial)",
        "synset": "treatment.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Manage (Manage.v.02, Treat.v.01)"
       },
       {
        "id": "activities-finance-managing-funds-545",
        "label": "finance (managing funds)",
        "synset": "finance.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Manage (Manage.v.02, Treat.v.01)"
       },
       {
        "id": "activities-administration-manage-546",
        "label": "administration (manage)",
        "synset": "administration.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-organization-547",
          "label": "organization",
          "synset": "organization.n.04",
          "virtual": false,
          "status": "none",
          "verb": "Organize (people or events) (Hold.v.03, Organize.v.05)"
         }
        ],
        "verb": "Administer (manage) (Administer.v.01)"
       }
      ],
      "verb": "Manage (Manage.v.02, Treat.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-authorize-548",
    "label": "Transfer service > Get service > Lead > Control > Authorize",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-authorization-549",
      "label": "authorization",
      "synset": "authorization.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-license-550",
        "label": "license",
        "synset": "license.n.04",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-clearance-551",
          "label": "clearance",
          "synset": "clearance.n.03",
          "virtual": false,
          "status": "none",
          "verb": "Authorize (Approve.v.01, Authorize.v.01)"
         }
        ],
        "verb": "License (License.v.01)"
       },
       {
        "id": "activities-commission-552",
        "label": "commission",
        "synset": "commission.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Authorize (Approve.v.01, Authorize.v.01)"
       }
      ],
      "verb": "Authorize (Approve.v.01, Authorize.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-order-enforce-553",
    "label": "Transfer service > Get service > Lead > Control > Order > Enforce",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-enforcement-554",
      "label": "enforcement",
      "synset": "enforcement.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-execution-of-judgment-555",
        "label": "execution (of judgment)",
        "synset": "execution.n.06",
        "virtual": false,
        "status": "none",
        "verb": "Enforce (Enforce.v.01, Enforce.v.02)"
       }
      ],
      "verb": "Enforce (Enforce.v.01, Enforce.v.02)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-order-establish-556",
    "label": "Transfer service > Get service > Lead > Control > Order > Establish",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-legislation-557",
      "label": "legislation",
      "synset": "legislation.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Establish (Lay_down.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-order-dispatch-558",
    "label": "Transfer service > Get service > Lead > Control > Order > Dispatch",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-dispatch-559",
      "label": "dispatch",
      "synset": "dispatch.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Dispatch (Dispatch.v.01)"
     },
     {
      "id": "activities-summons-560",
      "label": "summons",
      "synset": "summons.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Dispatch (Dispatch.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-regulate-561",
    "label": "Transfer service > Get service > Lead > Control > Regulate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-regulation-562",
      "label": "regulation",
      "synset": "regulation.n.06",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-timing-563",
        "label": "timing",
        "synset": "timing.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Regulate (authoritative) (Regulate.v.02)"
       },
       {
        "id": "activities-limitation-564",
        "label": "limitation",
        "synset": "limitation.n.05",
        "virtual": false,
        "status": "none",
        "verb": "Restrict (Restrict.v.02, Restrict.v.03)"
       },
       {
        "id": "activities-stipulation-565",
        "label": "stipulation",
        "synset": "stipulation.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Restrict (Restrict.v.02, Restrict.v.03)"
       }
      ],
      "verb": "Regulate (authoritative) (Regulate.v.02)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-prevent-defend-protect-566",
    "label": "Transfer service > Get service > Lead > Control > Prevent > Defend > Protect",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-protection-cross-ref-facilitate-567",
      "label": "protection (cross-ref Facilitate)",
      "synset": "protection.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Protect (Protect.v.01, Safeguard.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-prevent-restrain-568",
    "label": "Transfer service > Get service > Lead > Control > Prevent > Restrain",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-containment-restraint-569",
      "label": "containment (restraint)",
      "synset": "containment.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Restrain (Restrain.v.01, Restrain.v.03)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-control-stop-570",
    "label": "Transfer service > Get service > Lead > Control > Stop",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-suppression-571",
      "label": "suppression",
      "synset": "suppression.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-delay-572",
        "label": "delay",
        "synset": "delay.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Stop (Stop.v.01, Stop.v.03)"
       }
      ],
      "verb": "Stop (Stop.v.01, Stop.v.03)"
     },
     {
      "id": "activities-violence-573",
      "label": "violence",
      "synset": "violence.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Stop (Stop.v.01, Stop.v.03)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-get-service-lead-influence-motivate-574",
    "label": "Transfer service > Get service > Lead > Influence > Motivate",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-motivation-575",
      "label": "motivation",
      "synset": "motivation.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Motivate (Motivate.v.01)"
     }
    ]
   },
   {
    "id": "activities-transfer-service-end-service-discharge-576",
    "label": "Transfer service > End service > Discharge",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-liberation-discharge-577",
      "label": "liberation (discharge)",
      "synset": "liberation.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Achieve (Achieve.v.01)"
     }
    ]
   },
   {
    "id": "activities-3-4-events-578",
    "label": "3.4 Events",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-social-events-579",
    "label": "Social events",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-show-entertainment-event-580",
      "label": "show (entertainment event)",
      "synset": "show.n.03",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-attraction-581",
        "label": "attraction",
        "synset": "attraction.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       },
       {
        "id": "activities-broadcast-event-582",
        "label": "broadcast (event)",
        "synset": "broadcast.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       },
       {
        "id": "activities-performance-artistic-event-583",
        "label": "performance (artistic event)",
        "synset": "performance.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-act-within-performance-584",
          "label": "act (within performance)",
          "synset": "act.n.04",
          "virtual": false,
          "status": "none",
          "verb": "Participate (Enter.v.02)"
         }
        ],
        "verb": "Participate (Enter.v.02)"
       }
      ],
      "verb": "Participate (Enter.v.02)"
     },
     {
      "id": "activities-game-585",
      "label": "game",
      "synset": "game.n.01, game.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Participate (Enter.v.02)"
     },
     {
      "id": "activities-sport-586",
      "label": "sport",
      "synset": "sport.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Participate (Enter.v.02)"
     },
     {
      "id": "activities-dancing-event-587",
      "label": "dancing (event)",
      "synset": "dancing.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Dance (Dance.v.02)"
     },
     {
      "id": "activities-contest-588",
      "label": "contest",
      "synset": "contest.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-race-589",
        "label": "race",
        "synset": "race.n.02",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       },
       {
        "id": "activities-tournament-590",
        "label": "tournament",
        "synset": "tournament.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       },
       {
        "id": "activities-competition-591",
        "label": "competition",
        "synset": "competition.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       }
      ],
      "verb": "Participate (Enter.v.02)"
     },
     {
      "id": "activities-ceremony-592",
      "label": "ceremony",
      "synset": "ceremony.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-funeral-593",
        "label": "funeral",
        "synset": "funeral.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-burial-594",
          "label": "burial",
          "synset": "burial.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Attend (go to) (Attend.v.01)"
         }
        ],
        "verb": "Attend (go to) (Attend.v.01)"
       }
      ],
      "verb": "Attend (go to) (Attend.v.01)"
     },
     {
      "id": "activities-fundraiser-595",
      "label": "fundraiser",
      "synset": "fundraiser.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Attend (go to) (Attend.v.01)"
     },
     {
      "id": "activities-party-596",
      "label": "party",
      "synset": "party.n.04",
      "virtual": false,
      "status": "none",
      "verb": "Attend (go to) (Attend.v.01)"
     },
     {
      "id": "activities-service-religious-597",
      "label": "service (religious)",
      "synset": "service.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Attend (go to) (Attend.v.01)"
     },
     {
      "id": "activities-session-598",
      "label": "session",
      "synset": "session.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Attend (go to) (Attend.v.01)"
     },
     {
      "id": "activities-visit-social-event-599",
      "label": "visit (social event)",
      "synset": "visit.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Visit (Visit.v.01)"
     },
     {
      "id": "activities-affair-600",
      "label": "affair",
      "synset": "affair.n.03",
      "virtual": false,
      "status": "none",
      "verb": "Attend (go to) (Attend.v.01)"
     },
     {
      "id": "activities-foray-601",
      "label": "foray",
      "synset": "foray.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Participate (Enter.v.02)"
     }
    ]
   },
   {
    "id": "activities-legal-institutional-proceedings-602",
    "label": "Legal / institutional proceedings",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-proceeding-603",
      "label": "proceeding",
      "synset": "proceeding.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-procedure-legal-604",
        "label": "procedure (legal)",
        "synset": "procedure.n.04",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       },
       {
        "id": "activities-legal-action-605",
        "label": "legal action",
        "synset": "legal_action.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-prosecution-606",
          "label": "prosecution",
          "synset": "prosecution.n.01",
          "virtual": false,
          "status": "none",
          "verb": "Participate (Enter.v.02)"
         }
        ],
        "verb": "Participate (Enter.v.02)"
       },
       {
        "id": "activities-appeal-607",
        "label": "appeal",
        "synset": "appeal.n.03",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       },
       {
        "id": "activities-lawsuit-608",
        "label": "lawsuit",
        "synset": "lawsuit.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       },
       {
        "id": "activities-litigation-609",
        "label": "litigation",
        "synset": "litigation.n.01",
        "virtual": false,
        "status": "none",
        "verb": "Participate (Enter.v.02)"
       }
      ],
      "verb": "Participate (Enter.v.02)"
     }
    ]
   },
   {
    "id": "activities-4-miscellaneous-changes-610",
    "label": "4. Miscellaneous Changes",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-4-1-create-miscellaneous-611",
    "label": "4.1 Create (Miscellaneous)",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-infection-612",
      "label": "infection",
      "synset": "infection.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-pathogenesis-613",
      "label": "pathogenesis",
      "synset": "pathogenesis.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-accretion-614",
      "label": "accretion",
      "synset": "accretion.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-development-non-agentive-growth-615",
      "label": "development (non-agentive growth)",
      "synset": "development.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-growth-616",
        "label": "growth",
        "synset": "growth.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-fire-spontaneous-combustion-event-617",
      "label": "fire (spontaneous combustion event)",
      "synset": "fire.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "activities-4-2-modify-miscellaneous-618",
    "label": "4.2 Modify (Miscellaneous)",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-improvement-spontaneous-619",
      "label": "improvement (spontaneous)",
      "synset": "improvement.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-convalescence-620",
        "label": "convalescence",
        "synset": "convalescence.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-conversion-spontaneous-621",
      "label": "conversion (spontaneous)",
      "synset": "conversion.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-development-pathological-622",
      "label": "development (pathological)",
      "synset": "development.n.04",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-complication-623",
        "label": "complication",
        "synset": "complication.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-death-event-624",
      "label": "death (event)",
      "synset": "death.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-death-organic-process-625",
      "label": "death (organic process)",
      "synset": "death.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-variation-626",
      "label": "variation",
      "synset": "variation.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-deviation-627",
        "label": "deviation",
        "synset": "deviation.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-mutation-628",
      "label": "mutation",
      "synset": "mutation.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-transition-629",
      "label": "transition",
      "synset": "transition.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-distortion-630",
      "label": "distortion",
      "synset": "distortion.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-damage-631",
      "label": "damage",
      "synset": "damage.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-failure-632",
      "label": "failure",
      "synset": "failure.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-malfunction-633",
        "label": "malfunction",
        "synset": "malfunction.n.01",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-accident-634",
      "label": "accident",
      "synset": "accident.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-injury-635",
        "label": "injury",
        "synset": "injury.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-mistake-636",
      "label": "mistake",
      "synset": "mistake.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-omission-637",
        "label": "omission",
        "synset": "omission.n.01",
        "virtual": false,
        "status": "none",
        "children": [
         {
          "id": "activities-breach-638",
          "label": "breach",
          "synset": "breach.n.01",
          "virtual": false,
          "status": "none"
         }
        ]
       }
      ]
     },
     {
      "id": "activities-violation-639",
      "label": "violation",
      "synset": "violation.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-larceny-640",
        "label": "larceny",
        "synset": "larceny.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "activities-misdemeanor-641",
        "label": "misdemeanor",
        "synset": "misdemeanor.n.01",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "activities-abnormality-642",
        "label": "abnormality",
        "synset": "abnormality.n.04",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-disruption-643",
      "label": "disruption",
      "synset": "disruption.n.04",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-reaction-bodily-physiological-644",
      "label": "reaction (bodily/physiological)",
      "synset": "reaction.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-consumption-bodily-645",
      "label": "consumption (bodily)",
      "synset": "consumption.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-graze-646",
        "label": "graze",
        "synset": "graze.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-breathing-647",
      "label": "breathing",
      "synset": "breathing.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-cycle-648",
      "label": "cycle",
      "synset": "cycle.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-hardening-natural-649",
      "label": "hardening (natural)",
      "synset": "hardening.n.02",
      "virtual": false,
      "status": "none",
      "verb": "[new] Harden"
     },
     {
      "id": "activities-extermination-650",
      "label": "extermination",
      "synset": "extermination.n.02",
      "virtual": false,
      "status": "none",
      "verb": "Demolish (Demolish.v.01, Destroy.v.01)"
     }
    ]
   },
   {
    "id": "activities-4-3-transfer-miscellaneous-651",
    "label": "4.3 Transfer (Miscellaneous)",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-demand-economic-force-652",
      "label": "demand (economic force)",
      "synset": "demand.n.02",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-consumption-economic-653",
        "label": "consumption (economic)",
        "synset": "consumption.n.03",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-response-involuntary-654",
      "label": "response (involuntary)",
      "synset": "response.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-reaction-general-response-655",
        "label": "reaction (general response)",
        "synset": "reaction.n.05",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-consequence-656",
      "label": "consequence",
      "synset": "consequence.n.01",
      "virtual": false,
      "status": "none",
      "children": [
       {
        "id": "activities-change-as-consequence-657",
        "label": "change (as consequence)",
        "synset": "change.n.04",
        "virtual": false,
        "status": "none"
       },
       {
        "id": "activities-impact-658",
        "label": "impact",
        "synset": "impact.n.02",
        "virtual": false,
        "status": "none"
       }
      ]
     },
     {
      "id": "activities-loss-659",
      "label": "loss",
      "synset": "loss.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-violence-non-agentive-event-660",
      "label": "violence (non-agentive event)",
      "synset": "violence.n.01",
      "virtual": false,
      "status": "none",
      "verb": "Stop (Stop.v.01, Stop.v.03)"
     }
    ]
   },
   {
    "id": "activities-5-misclassified-661",
    "label": "5. Misclassified",
    "synset": null,
    "virtual": false,
    "status": "none"
   },
   {
    "id": "activities-5-1-abstract-entities-event-structure-temporal-markers-662",
    "label": "5.1 Abstract Entities — Event Structure / Temporal Markers",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-cause-663",
      "label": "cause",
      "synset": "cause.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-factor-664",
      "label": "factor",
      "synset": "factor.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-parameter-665",
      "label": "parameter",
      "synset": "parameter.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-etiology-666",
      "label": "etiology",
      "synset": "etiology.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-emergency-667",
      "label": "emergency",
      "synset": "emergency.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-milestone-668",
      "label": "milestone",
      "synset": "milestone.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-result-669",
      "label": "result",
      "synset": "result.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-win-670",
      "label": "win",
      "synset": "win.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-success-outcome-state-671",
      "label": "success (outcome state)",
      "synset": "success.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-incident-672",
      "label": "incident",
      "synset": "incident.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-case-673",
      "label": "case",
      "synset": "case.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-finding-674",
      "label": "finding",
      "synset": "finding.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-verdict-675",
      "label": "verdict",
      "synset": "verdict.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-opinion-676",
      "label": "opinion",
      "synset": "opinion.n.05",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-first-step-677",
      "label": "first step",
      "synset": "first_step.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-gap-disagreement-state-678",
      "label": "gap (disagreement state)",
      "synset": "gap.n.05",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-source-679",
      "label": "source",
      "synset": "source.n.07",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-origin-680",
      "label": "origin",
      "synset": "origin.n.05",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "activities-5-2-actor-ontology-occupations-and-role-types-681",
    "label": "5.2 Actor Ontology — Occupations and Role-Types",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-occupation-682",
      "label": "occupation",
      "synset": "occupation.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-accountancy-683",
      "label": "accountancy",
      "synset": "accountancy.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-technology-field-684",
      "label": "technology (field)",
      "synset": "technology.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-engagement-employment-state-685",
      "label": "engagement (employment state)",
      "synset": "engagement.n.05",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-workload-686",
      "label": "workload",
      "synset": "workload.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-trade-craft-profession-687",
      "label": "trade (craft/profession)",
      "synset": "trade.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-lighting-trade-specialty-688",
      "label": "lighting (trade specialty)",
      "synset": "lighting.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-sewing-trade-sense-689",
      "label": "sewing (trade sense)",
      "synset": "sewing.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-specialization-690",
      "label": "specialization",
      "synset": "specialization.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-career-691",
      "label": "career",
      "synset": "career.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "activities-5-3-institutional-economic-ontology-692",
    "label": "5.3 Institutional / Economic Ontology",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-commercial-enterprise-693",
      "label": "commercial enterprise",
      "synset": "commercial_enterprise.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-industry-sector-694",
      "label": "industry (sector)",
      "synset": "industry.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-output-quantity-descriptor-695",
      "label": "output (quantity descriptor)",
      "synset": "output.n.02",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-production-industrial-capacity-696",
      "label": "production (industrial capacity)",
      "synset": "production.n.07",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-finance-domain-field-697",
      "label": "finance (domain/field)",
      "synset": "finance.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-storage-infrastructure-698",
      "label": "storage (infrastructure)",
      "synset": "storage.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-construction-commercial-enterprise-sense-699",
      "label": "construction (commercial enterprise sense)",
      "synset": "construction.n.07",
      "virtual": false,
      "status": "none"
     }
    ]
   },
   {
    "id": "activities-5-4-physical-properties-not-processes-700",
    "label": "5.4 Physical Properties — Not Processes",
    "synset": null,
    "virtual": false,
    "status": "none",
    "children": [
     {
      "id": "activities-pressure-701",
      "label": "pressure",
      "synset": "pressure.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-beam-radiation-stream-702",
      "label": "beam (radiation stream)",
      "synset": "beam.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-signal-703",
      "label": "signal",
      "synset": "signal.n.03",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-amperage-704",
      "label": "amperage",
      "synset": "amperage.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-charge-electrical-705",
      "label": "charge (electrical)",
      "synset": "charge.n.04",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-current-electrical-706",
      "label": "current (electrical)",
      "synset": "current.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-electric-resistance-707",
      "label": "electric resistance",
      "synset": "electric_resistance.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-electric-potential-708",
      "label": "electric potential",
      "synset": "electric_potential.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-voltage-709",
      "label": "voltage",
      "synset": "voltage.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-field-physical-710",
      "label": "field (physical)",
      "synset": "field.n.05",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-wind-711",
      "label": "wind",
      "synset": "wind.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-gas-state-of-matter-712",
      "label": "gas (state of matter)",
      "synset": "gas.n.01",
      "virtual": false,
      "status": "none"
     },
     {
      "id": "activities-heat-natural-thermal-energy-713",
      "label": "heat (natural thermal energy)",
      "synset": "heat.n.01",
      "virtual": false,
      "status": "none"
     }
    ]
   }
  ]
 }
};

export const SUBONTOLOGIES = [
  { id: 'physical',   label: 'Physical'   },
  { id: 'info',       label: 'Info'       },
  { id: 'actor',      label: 'Actor'      },
  { id: 'activities', label: 'Activities' },
] as const;
