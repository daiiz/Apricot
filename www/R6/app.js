var a = apricot.api;

// Polymerが上手く反応していない部分の手当て
function patchTxtBox(id, label) {
  var box = document.querySelector("#" + id);
  var label_tag = box.querySelector('label');
  var textarea_tag = box.querySelector('textarea');
  label_tag.innerHTML = label;
}

function createNewCard() {
  var textarea = a.NewBrickExtends({
    role: "paper-textarea",
    property: {
        id: "box1",
        label: "ラベル",        // Polymerが反応していない模様
        spellcheck: false
    }
  }, null);
  a.Dom('base6_1').appendChild(textarea);
  patchTxtBox(textarea.id, "ラベル");
}

window.addEventListener('apricot-ready', function(e) {
  createNewCard();
}, false);