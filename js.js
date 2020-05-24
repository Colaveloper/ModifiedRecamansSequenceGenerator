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

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
