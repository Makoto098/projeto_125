function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("Model Loaded!");
}

function gotPoses(results) {
  poses = results;
  if (poses.length > 0) {
    // Encontrar as coordenadas x dos pulsos esquerdo e direito
    let leftWristX = poses[0].pose.keypoints[9].position.x;
    let rightWristX = poses[0].pose.keypoints[10].position.x;

    // Calcular a diferença entre as coordenadas x dos pulsos
    let difference = rightWristX - leftWristX;

    // Arredondar a diferença para remover decimais
    let roundedDifference = floor(difference);

    // Atualizar o tamanho do texto com a diferença calculada
    textSize(roundedDifference);

    // Configurar a cor de fundo
    background(220);

    // Configurar a cor do texto
    fill(0);

    // Adicionar texto à tela com coordenadas x e y dinâmicas
    text("Seu Nome", 10, roundedDifference);
  }
}

function draw() {
  // Aqui, você pode adicionar qualquer outra lógica de desenho, se necessário
}
