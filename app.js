//La firma es el nombre de la función, los parámetros y lo que retorna
function animateElement(elementSide, startSide, targetSide, durationSide)
{ //Retornará promesa con elemento
  elementSide.style.left = startSide;
  let counter = 0;
  const delta = (targetSide - startSide) * 70 / durationSide; //delta es lo que se debe mover por cuadro
  return new Promise((resolve, reject) =>
  { // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
    const loop = setInterval(() =>
    { // toma una funcion y la repite cada ciertos milisegundos
      const current = startSide + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
      elementSide.style.left = current;
      if (startSide > targetSide && current <= targetSide)
      { // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target
        elementSide.style.left = current;
        clearInterval(loop); // Acá se termina la promesa
        resolve(); //Si queremos pasar una respuesta es a través del parámetro de resolve
      }
      else if (startSide < targetSide && current >= targetSide)
      {
        elementSide.style.left = current;
        clearInterval(loop); // Acá se termina la promesa
        resolve(); //Si queremos pasar una respuesta es a través del parámetro de resolve
      }
    }, 40); // 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
  });
}

function animateElementTopDown(elementTopDown, startTopDown, targetTopDown, durationTopDown)
{
  elementTopDown.style.top = startTopDown;
  let counter = 0;
  const deltaTopDown = (targetTopDown - startTopDown) * 60 / durationTopDown;
  return new Promise((resolve, reject) =>
  {
    const loop = setInterval(() =>
    {
      const current = startTopDown + counter++ * deltaTopDown;
      elementTopDown.style.top = current;
      if (startTopDown > targetTopDown && current <= targetTopDown)
      {
        elementTopDown.style.top = current;
        clearInterval(loop);
      }
      else if (startTopDown < targetTopDown && current >= targetTopDown)
      {
        elementTopDown.style.left = current;
        clearInterval(loop);
        resolve()
      }
    }, 40);
  });
}

// Somos programadoras de la promise
//===================== Promise ===================
// Somos las usuarias de la promise

//Secuencial

const allLi = document.getElementsByTagName("li");

Promise.all(
  [
    animateElement(allLi[1], 0, 1100, 8000),
    animateElement(allLi[0], 0, 1100, 8000)
  ]
).then((results) =>
{
  console.log("Animación a la derecha terminada");
  return Promise.all(
    [
      animateElementTopDown(allLi[1], 0, 500, 7000),
      animateElementTopDown(allLi[0], 80, 500, 8000)
    ]
  )
}).then((results) =>
{
  console.log("Animación hacia abajo terminada");
  return Promise.all(
    [
      animateElement(allLi[1], 800, 20, 7000),
      animateElement(allLi[0], 800, 20, 7000)
    ]
  )
}).then((results) =>
{
  console.log("Animación a la izquierda terminada");
  return Promise.all(
    [
      animateElementTopDown(allLi[1], 300, 0, 2000),
      animateElementTopDown(allLi[0], 400, 200, 3000)
    ]
  )
}).then((results) =>
{
  console.log("Animación hacia arriba terminada");

}).catch(() =>
{
  console.log("Falló la animación");
});