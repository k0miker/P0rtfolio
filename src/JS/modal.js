// Hole das Modal
var modal = document.getElementById("myModal");

// Hole die Div, die das Modal öffnet
var divToOpenModal = document.getElementById("openModal");

// Hole das <span> Element, das das Schließen des Modals ermöglicht
var span = document.getElementsByClassName("close")[0];

// Wenn auf die Div geklickt wird, öffne das Modal
divToOpenModal.onclick = function() {
  modal.style.display = "block";
}

// Wenn auf das <span> (x) geklickt wird, schließe das Modal
span.onclick = function() {
  modal.style.display = "none";
}

// Wenn außerhalb des Modals geklickt wird, schließe es
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
