import { want } from "../../unit/";
import event from "../../unit/event";
import states from "../states";
import { music } from "../../unit/music";
import { blankMatrix } from "../../unit/const";
const down = store => {
  store.commit('key_down', true);
  if (store.cur !== null) {
    event.down({
      key: "down",
      begin: 40,
      interval: 40,
      callback: stopDownTrigger => {
        const state = store;
        if (state.lock) {
          return;
        }
        if (music.move) {
          music.move();
        }
        const cur = state.cur;
        if (cur === null) {
          return;
        }
        if (state.pause) {
          states.pause(false);
          return;
        }
        const next = cur.fall();
        if (want(next, state.matrix)) {
          store.commit('moveBlock', next);
          // store.dispatch(actions.moveBlock(next));
          states.auto();
        } else {
          const base = Array.isArray(state.matrix) ? state.matrix : blankMatrix
          let matrix = base.map(row => row.slice());
          const shape = cur.shape;
          const xy = cur.xy;
          shape.forEach((m, k1) =>
            m.forEach((n, k2) => {
              if (n && xy[0] + k1 >= 0) {
                // 竖坐标可以为负
                let line = matrix[xy[0] + k1];
                line[xy[1] + k2] = 1;

                matrix[xy[0] + k1] = line;
              }
            })
          );
          states.nextAround(matrix, stopDownTrigger);
        }
      }
    });
  } else {
    event.down({
      key: "down",
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.lock) {
          return;
        }
        const state = store;
        const cur = state.cur;
        if (cur) {
          return;
        }
        if (music.move) {
          music.move();
        }
        let startLines = state.startLines;
        startLines = startLines - 1 < 0 ? 10 : startLines - 1;
        store.commit('startLines', startLines);
        // store.dispatch(actions.startLines(startLines));
      }
    });
  }
};

const up = store => {
  store.commit('key_down', false);
  event.up({
    key: "down"
  });
};

export default {
  down,
  up
};
