// Normalização única de um estado vindo da cloud antes de o aplicar localmente.
// Usada pelo ecrã Conta e progresso e pela sincronização automática.
import {migrateCloudSync} from "./cloudReliability.js";
import {migrateDailyMission} from "./dailyMission.js";
import {migrateCompetition} from "./competition.js";
import {migrateEngagement} from "./engagement.js";
import {migratePedagogicalIds,recalibrateAllScores} from "./engine.js";

export function normalizeAfterCloud(base){
  return migrateCloudSync(
    migrateDailyMission(
      migrateCompetition(
        migrateEngagement(
          migratePedagogicalIds({
            ...base,
            scores:recalibrateAllScores(base.scores)
          })
        )
      )
    )
  );
}
