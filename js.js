let jump = 1; //lunghezza del prossimo salto
let position = 0; //posizione corrente
const positions = [0]; //array con le posizioni assunte
const jumps = [1]; //array con i salti effettuati

compute();

function compute() {
  console.log("iteration:", 0, "jump:", 0, "position:", 0);
  for (i = 1; i < 10000; i++) {
    //jump aumenta a destra dello zero e viceversa
    if (position > 0) {
      jump++;
    }
    if (position < 0) {
      jump--;
    }

    // console.log(
    //   "iteration:",
    //   i,
    //   "jump:",
    //   jump,
    //   "position:",
    //   position,
    //   "possible jump left:",
    //   possibleJumpLeft(),
    //   "possible jump right:",
    //   possibleJumpRight(),
    //   "jump direction right:",
    //   jumpDirectionRight()
    // );
    computePosition();
  }
  300;
  console.log(/*"positions", positions.toString(),*/ "jumps", jumps.toString());
}

function computePosition() {
  //position cambia di 'jump' verso lo zero, senza assumere valori già assunti
  if (
    (possibleJumpRight() && jumpDirectionRight()) ||
    (!possibleJumpLeft() && !jumpDirectionRight()) //possibleJumpLeft risulta falso invece che vero
  ) {
    //potendo andare a dx e dovendo andare a dx, o non potendo andare a sx e dovendo andare a sx, vai a dx
    position = position + Math.abs(jump);
    //console.log("rightward");
  } else if (
    (possibleJumpLeft() && !jumpDirectionRight()) ||
    (!possibleJumpRight() && jumpDirectionRight())
  ) {
    //potendo andare a sx e dovendo andare a sx, o non potendo andare a dx e dovendo andare a sx, vai a sx
    position = position - Math.abs(jump);

    //console.log("leftward");
  } else {
    allert("series is finite");
  }
  positions.push(position);
  addData(position);
  jumps.push(jump);
}

function possibleJumpRight() {
  //se vera si può saltare a destra
  return !positions.includes(position + Math.abs(jump));
}

function possibleJumpLeft() {
  //possibleJumpLeft risulta falso invece che vero
  //se vera si può saltare a sinistra
  return !positions.includes(position - Math.abs(jump));
}

function jumpDirectionRight() {
  //se vera si deve preferire saltare a destra
  return position <= 0;
}

function addData(data) {
  myChart.data.forEach((dataset) => {
    dataset.data.push(data);
  });
  myChart.update();
}

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  label: "#iterations",
  data: {
    datasets: [
      {
        label: "#iterations",
        data: [],
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
