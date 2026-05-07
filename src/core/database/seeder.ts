import { dbManager } from './DatabaseManager';

const ANCHOR_TASKS =[
  // CATEGORY: BOREDOM (Action/Activation)
  { category: 'Boredom', taskDirective: 'DROP AND DO 10 PUSHUPS.', durationSeconds: 30 },
  { category: 'Boredom', taskDirective: 'HOLD A PLANK. DO NOT DROP.', durationSeconds: 60 },
  { category: 'Boredom', taskDirective: 'ORGANIZE YOUR IMMEDIATE WORKSPACE.', durationSeconds: 120 },
  { category: 'Boredom', taskDirective: 'STAND UP. REACH CEILING. HOLD.', durationSeconds: 30 },
  { category: 'Boredom', taskDirective: 'WRITE DOWN ONE TANGIBLE GOAL FOR TODAY.', durationSeconds: 60 },

  // CATEGORY: ANXIETY (Grounding/Parasympathetic)
  { category: 'Anxiety', taskDirective: 'BOX BREATHING: INHALE 4S, HOLD 4S, EXHALE 4S.', durationSeconds: 60 },
  { category: 'Anxiety', taskDirective: 'WASH HANDS. FREEZING COLD WATER.', durationSeconds: 30 },
  { category: 'Anxiety', taskDirective: 'CLENCH EVERY MUSCLE IN YOUR BODY. RELEASE.', durationSeconds: 15 },
  { category: 'Anxiety', taskDirective: 'NAME 3 PHYSICAL OBJECTS IN THE ROOM ALOUD.', durationSeconds: 20 },
  { category: 'Anxiety', taskDirective: 'FEEL THE FLOOR BENEATH YOUR FEET. PLANT THEM.', durationSeconds: 30 },

  // CATEGORY: UNCERTAINTY (Decisiveness/Clarity)
  { category: 'Uncertainty', taskDirective: 'MAKE ONE IMMEDIATE, LOW-STAKES DECISION.', durationSeconds: 30 },
  { category: 'Uncertainty', taskDirective: 'WRITE DOWN THE WORST CASE SCENARIO. FLIP IT.', durationSeconds: 120 },
  { category: 'Uncertainty', taskDirective: 'TIDY EXACTLY ONE ITEM ON YOUR DESK.', durationSeconds: 15 },
  { category: 'Uncertainty', taskDirective: 'FLIP A COIN. ACCEPT THE OUTCOME IMMEDIATELY.', durationSeconds: 10 },
  { category: 'Uncertainty', taskDirective: 'CLOSE YOUR EYES. COUNT BACKWARDS FROM 50.', durationSeconds: 60 },

  // CATEGORY: FATIGUE (Shock/Reset)
  { category: 'Fatigue', taskDirective: 'SPLASH ICE COLD WATER ON YOUR FACE.', durationSeconds: 30 },
  { category: 'Fatigue', taskDirective: 'DRINK 8OZ OF WATER IMMEDIATELY.', durationSeconds: 20 },
  { category: 'Fatigue', taskDirective: 'STAND UP. WALK TO THE NEAREST WINDOW. LOOK OUT.', durationSeconds: 60 },
  { category: 'Fatigue', taskDirective: '20 JUMPING JACKS. NOW.', durationSeconds: 45 },
  { category: 'Fatigue', taskDirective: 'RUB YOUR HANDS TOGETHER BRISKLY FOR HEAT.', durationSeconds: 15 }
];

export async function seedAnchorTasks(): Promise<void> {
  try {
    // Check if tasks are already seeded to prevent bloat on multiple launches
    const existingTasks = await dbManager.executeSql('SELECT COUNT(*) as count FROM AnchorTasks');
    if (existingTasks[0].count > 0) {
      console.log('[SYSTEM] AnchorTasks already seeded. Bypassing.');
      return;
    }

    console.log('[SYSTEM] Seeding 20 somatic micro-tasks...');
    
    const insertQuery = `INSERT INTO AnchorTasks (category, taskDirective, durationSeconds) VALUES (?, ?, ?)`;
    
    for (const task of ANCHOR_TASKS) {
      await dbManager.executeSql(insertQuery,[task.category, task.taskDirective, task.durationSeconds]);
    }

    console.log('[SYSTEM] AnchorTasks securely seeded to local DB.');
  } catch (error) {
    console.error('[DATABASE_ERR] Failed to seed AnchorTasks:', error);
  }
}

const AFFIRMATIONS =[
  // CATEGORY: BOREDOM
  { category: 'Boredom', content: 'Depth is found in the ordinary. You have reclaimed the capacity to notice.' },
  { category: 'Boredom', content: 'Stimulation is cheap. Silence is a luxury. Own it.' },
  { category: 'Boredom', content: 'The algorithm feeds on your idle hands. You chose stillness instead.' },
  { category: 'Boredom', content: 'Boredom is the prerequisite to creation. Do not fear the void.' },

  // CATEGORY: ANXIETY
  { category: 'Anxiety', content: 'You are the observer of the storm, not the storm itself.' },
  { category: 'Anxiety', content: 'Velocity is not direction. You have halted the spiral.' },
  { category: 'Anxiety', content: 'The panic loop requires your participation to survive. You withdrew.' },
  { category: 'Anxiety', content: 'Ground firmly. The digital phantom has no physical weight.' },

  // CATEGORY: UNCERTAINTY
  { category: 'Uncertainty', content: 'Action destroys doubt. You made a definitive choice.' },
  { category: 'Uncertainty', content: 'The unknown cannot be scrolled away. Face reality directly.' },
  { category: 'Uncertainty', content: 'Clarity is forged in the present, not in the feed.' },
  { category: 'Uncertainty', content: 'You chose reality over a synthesized illusion of control.' },

  // CATEGORY: FATIGUE
  { category: 'Fatigue', content: 'Rest cannot be found in a glowing rectangle.' },
  { category: 'Fatigue', content: 'You denied the machine your exhaustion.' },
  { category: 'Fatigue', content: 'True recovery requires disconnection. You are offline.' },
  { category: 'Fatigue', content: 'Depletion ends here. Reclaim your biological battery.' }
];

export async function seedAffirmations(): Promise<void> {
  try {
    const existing = await dbManager.executeSql('SELECT COUNT(*) as count FROM Affirmations');
    if (existing[0].count > 0) {
      console.log('[SYSTEM] Affirmations already seeded. Bypassing.');
      return;
    }

    console.log('[SYSTEM] Seeding brutalist affirmations...');
    const insertQuery = `INSERT INTO Affirmations (category, content) VALUES (?, ?)`;
    
    for (const quote of AFFIRMATIONS) {
      await dbManager.executeSql(insertQuery, [quote.category, quote.content]);
    }

    console.log('[SYSTEM] Affirmations securely seeded to local DB.');
  } catch (error) {
    console.error('[DATABASE_ERR] Failed to seed Affirmations:', error);
  }
}