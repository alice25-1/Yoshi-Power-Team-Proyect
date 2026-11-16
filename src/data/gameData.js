export const DIALOGUES = {
    
    CH1_INTRO: [
      {
        character: 'Tongue',
        text: 'Hello, Baudinii! Today is the big day—we’re blasting off beyond Earth on a mission inspired by Artemis lunar exploration!',
      },
      {
        character: 'Baudinii',
        text: 'I’m ready, Tongue! Every space mission starts with a human need: testing reliable energy and comms on the Moon so we can bring data back to Earth.',
        techTitle: 'SCIENCE MISSION GOALS (SMD)',
        techDetail: 'In space systems engineering, science missions explore planetary environments to advance knowledge and benefit humanity—supporting sustainable lunar infrastructure.',
        kidWords: 'Planetary Environments: The real rocks, temperature, and space conditions on other worlds like the Moon.',
      },
      {
        character: 'Tongue',
        text: 'Good thing we didn’t leave anything to chance! We followed our Mission Requirements and our CONOPS—our step-by-step flight map!',
        techTitle: 'CONOPS & 6-STEP PROCESS',
        techDetail: 'Space agencies develop missions through: Need & Goals -> Concept -> Requirements -> Design -> Build & Verify -> Implement, guided by a Concept of Operations (ConOps).',
        kidWords: 'CONOPS: The step-by-step recipe book of the mission. • Requirements: The must-have safety rules a ship needs before flying.',
      },
      {
        character: 'Baudinii',
        text: 'All four mission segments team up here: our Launch Segment put us in orbit to meet Goliat (Space Segment), and later our Ground Segment antennas will send lunar data to young scientists in Guatemala (User Segment)!',
        techTitle: '4 MAJOR MISSION SEGMENTS',
        techDetail: '1. Launch (rocket to orbit) • 2. Space (Goliat spacecraft & instruments) • 3. Ground (antennas & mission control) • 4. User (scientists & students in Guatemala analyzing returned data).',
        kidWords: 'Low Earth Orbit (LEO): The space zone closest to Earth (~400 km up) where crews test spacecraft before flying to the Moon.',
      },
      {
        character: 'Tongue',
        text: 'We’re in orbit and Goliat is right ahead! Walk over to the helm console so we can start the docking sequence.',
      },
    ],
  
    DOCKING_CONSOLE: [
      {
        character: 'Baudinii',
        text: 'HOW TO DOCK: Use the controls to keep the alignment cross centered inside the target ring until the clamps lock!',
      },
      {
        character: 'Tongue',
        text: 'WHY IT MATTERS: In orbit we travel at 7.66 km/s! Even a tiny angle mistake causes a kinetic crash that will destroy both spacecraft modules!',
        techTitle: 'ATTITUDE CONTROL & FLIGHT DYNAMICS (MDL)',
        techDetail: 'Docking in microgravity requires precise 3-axis steering. Because there is no air friction in space, thrusters must carefully counter inertia to avoid a collision.',
        kidWords: 'Attitude Control: Steering which direction the nose of the rocket points. • Inertia: Moving objects in space keep drifting until a thruster pushes them back!',
      },
    ],
  
    HATCH_LOCKED: [
      {
        character: 'Tongue',
        text: 'Awesome docking! Wait... the main hatch is locked and I can’t reach Froggy or Frogatha on the radio!',
      },
      {
        character: 'Baudinii',
        text: 'HOW & WHY: An avionics power glitch sealed the door! Use the repair console to reconnect Power, Avionics, and Comms so we can open the hatch and reunite with our crew!',
        techTitle: 'AVIONICS, POWER & ANOMALY SUPPORT',
        techDetail: 'During the Implement phase, flight engineers monitor telemetry for anomalies. Restoring internal Power Systems and Avionics buses is critical before crew transfer.',
        kidWords: 'Telemetry: Automatic health report beamed to Earth. • Avionics: The ship’s electronic brain. • Power Bus: The main electrical highway inside the ship.',
      },
    ],
  
    CH1_COMPLETE: [
      {
        character: 'Froggy',
        text: 'The hatch is open! Tongue, Baudinii—welcome aboard Goliat! Our comms are loud and clear now.',
      },
      {
        character: 'Frogatha',
        text: 'High five, crew! All Space Segment subsystems are verified and ready. Next stop: the Moon!',
      },
    ],
  
    
    CH2_INTRO: [
      {
        character: 'Froggy',
        text: 'Crew reunited! Our Trans-Lunar Injection burn is complete—we’re riding our curved Earth-to-Moon transfer trajectory!',
      },
      {
        character: 'Frogatha',
        text: 'Looking good, Froggy! Our flight engineers calculated the exact velocity changes so we reach the Moon without wasting fuel or power margins.',
        techTitle: 'ORBITAL TRAJECTORIES & DELTA-V',
        techDetail: 'To travel from Earth to the Moon efficiently, spacecraft follow curved transfer trajectories—calculating precise rocket burns (Delta-V) to balance spacecraft mass, travel time, and fuel consumption.',
        kidWords: 'Trajectory: The curved highway a spacecraft follows through space. • Delta-V: The total pushing power a rocket has to speed up, slow down, or turn!',
      },
      {
        character: 'Tongue',
        text: 'Hold on—our proximity sensors are flashing red! A dense stream of micrometeoroids is crossing right ahead of our flight path!',
      },
      {
        character: 'Baudinii',
        text: 'Remember how heavy our docking thrusters and power bus repair made our approach in Chapter 1? Every sharp dodge now will burn extra energy—to the navigation helm, team!',
      },
    ],
  
    METEOR_CONSOLE: [
      {
        character: 'Baudinii',
        text: 'HOW & WHY: Steer Goliat left and right to dodge every incoming rock! Even tiny meteoroids fly at 40 km/s—one hit can puncture our tanks and force us to restart our evasive burn!',
        techTitle: 'ORBITAL DEBRIS & SHIELDING',
        techDetail: 'In deep space, micrometeoroids travel faster than bullets. Mission engineers evaluate Orbital Debris risks and design multi-layer Whipple Shields to protect spacecraft structures.',
        kidWords: 'Micrometeoroids: Tiny space rocks flying super fast through space. • Hull: The outer protective metal skin of a spacecraft!',
      },
    ],
  
    POWER_PUZZLE: [
      {
        character: 'Frogatha',
        text: 'HOW & WHY: Trade-off locked in! Now walk to the power console and solve the circuit puzzle to reconnect our solar array—without electricity, our guidance systems will shut down before we reach the Moon!',
        techTitle: 'POWER SYSTEMS & TRADE-OFFS',
        techDetail: 'In space, electrical power and mass are strictly limited. When anomalies happen, engineers make trade-offs—sacrificing secondary instruments to keep propulsion, thermal control, and communications alive.',
        kidWords: 'Solar Arrays: Wing-like panels that turn sunlight into electricity. • Trade-off: Giving up one feature so you have enough energy or weight to keep the most important parts working!',
      },
    ],
  
    CH2_COMPLETE: [
      {
        character: 'Baudinii',
        text: 'Power Systems stabilized! Lunar orbit insertion is locked in—firing landing thrusters now!',
      },
      {
        character: 'Froggy',
        text: 'Brace for touchdown, crew! Next stop: exploring the lunar surface!',
      },
    ],
  
    
    CH3_INTRO: [
      {
        character: 'Tongue',
        text: 'Touchdown confirmed! We made it to the lunar surface in one piece, crew!',
      },
      {
        character: 'Baudinii',
        text: 'Look at that view! Remember our mission goal: we are not building antennas yet—we are here to collect vital lunar data so scientists back on Earth can evaluate if future antennas can work here!',
      },
    ],
  
    LUNAR_SURVEY: [
      {
        character: 'Frogatha',
        text: 'HOW & WHY: Walk to the 3 marked lunar zones and scan sunlight, temperature, and Earth visibility! Collecting real environmental data tells engineers whether future Ground Segment antennas could survive and send signals from here!',
        techTitle: 'PRECURSOR DATA & TRADE STUDIES (MDL)',
        techDetail: 'Before building costly space infrastructure, precursor missions gather environmental measurements—sunlight hours, thermal extremes, and direct Earth Line-of-Sight—so engineers can run accurate Trade Studies.',
        kidWords: 'Precursor Mission: A scout mission sent first to gather clues and test conditions before building permanent equipment! • Line-of-Sight: A clear, open path with no mountains blocking radio signals to Earth.',
      },
    ],
  
    SAMPLE_COLLECTION: [
      {
        character: 'Froggy',
        text: 'HOW & WHY: Walk around the landing zone and collect 3 lunar soil samples before boarding Goliat! Studying Moon dust and rock composition helps scientists design safe materials for future missions!',
        techTitle: 'PLANETARY SCIENCE & SAMPLE RETURN',
        techDetail: 'Lunar dust (regolith) is sharp and electrically charged. Returning physical soil and sensor data allows scientists to test how lunar materials affect electronics and solar panels.',
        kidWords: 'Regolith: The layer of loose dust and broken rock covering the surface of the Moon!',
      },
    ],
  
    CH3_COMPLETE: [
      {
        character: 'Tongue',
        text: 'All lunar measurements and soil samples secured! Firing ascent thrusters—we’re heading home to Earth!',
      },
      {
        character: 'Baudinii',
        text: 'Mission accomplished, team! Now we share our lunar findings with students, teachers, and young scientists in Guatemala—our User Segment—so they can design the next generation of lunar missions!',
      },
      {
        character: 'Froggy',
        text: 'Access to space for all! Let’s review our final mission post-mortem report!',
      },
    ],
  };
  