apricot.manifest = {
  /* base5.png */
  "base5": {

    "brick_0": {
      "design": {
        "ShadowLevel": 3,
        "zIndex": 10,
        "backgroundColor": "#3F51B5",
        "FullWidth": true
      }
    },

    "brick_1": {
      "role": "html-img",
      "property": {
        "src": "apricot.png"
      },
      "design": {
        "zIndex": 11,
        "cursor": "pointer"
      }
    },

    "brick_2": {
      "role": "html-div",
      "property": {},
      "design": {
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "zIndex": 11,
        "width": "200px",
        "color": "#fff",
        "fontWeight": 200,
        "fontFamily": "Roboto",
        "Content": "Apricot Brick",
        "Top": "+8px",
        "FontScale": "L"
      }
    },

    "brick_3": {
      "design": {
        "FullWidth": true
      }
    },

    "brick_4": {
      "role": "html-input",
      "property": {
        "placeholder": "ここに入力"
      },
      "design": {
        "backgroundColor": "#fff",
        "left": "10px",
        "height": "auto",
        "Visible": true,
      }
    },

    "brick_5": {
      "role": "html-div",
      "property": {},
      "design": {
        "ShadowLevel": 0,
        "backgroundColor": "#e9e7e4",
        "overflow-y": "scroll",
        "padding": "10px",
        "Height": "+20px",
        "boxSizing": "border-box",
        "display": "flex",
        "flex-wrap": "wrap",
        "align-content": "flex-start",
        "FullWidth": true
      }
    },

    "brick_6": {
      "role": "html-button",
      "property": {},
      "design": {
        "Content": "Hello,Apricot!",
        "width": "auto",
        "height": "auto",
        "backgroundColor": "",
        "top": "115px",
        "left": "150px"
      }
    },

    "brick_7": {
      "role": "html-img",
      "property": {
        "src": "gudebook.jpg"
      },
      "design": {
        "backgroundColor": "#FFC107",
        "FullWidth": true,
        "position": "fixed",
        "top": "",
        "bottom": "0px"
      }
    }
  },

  /* panel.png */
  "panel": {
    "brick_1": {
      "design": {
        "backgroundColor": "#e5e5e5"
      }
    }
  },

  /* card.png */
  "card": {
    "brick_0": {
      "design": {
        "borderRadius": "2px",
        "width": "100%",
        "Cardboard": "c",
        "height": "60px",
        "margin-bottom": "10px",
        "boxSizing": "border-box"
      }
    }
  }

}
