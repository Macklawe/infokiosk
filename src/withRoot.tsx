import * as React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import * as variableColor from "./style/style";
// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 13,
    fontFamily: '"Open Sans", sans-serif'
  },
  palette: {
    primary: {
      main: variableColor.primary
    },
    secondary: {
      main: variableColor.text
    }
  },
  overrides: {
    MuiDialog: {
      paper: {
        minWidth: 400,
        borderRadius: 0,
        backgroundColor: variableColor.bodyBackground,
        border: "1px solid " + variableColor.borderColor
      }
    },
    MuiDialogTitle: {
      root: {
        padding: 0
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: variableColor.borderColor
      }
    },
    MuiTypography: {
      title: {
        color: variableColor.text,
        fontSize: 12,
        fontWeight: 100,
        lineHeight: "16px"
      },
      colorTextSecondary: {
        color: "#dddddd",
        fontSize: 12,
        fontWeight: 300
      }
    },
    MuiDialogContent: {
      root: {
        padding: 16
      }
    },
    MuiDialogContentText: {
      root: {
        color: variableColor.text,
        fontSize: 12,
        fontWeight: 100,
        lineHeight: "16px"
      }
    },
    MuiDialogActions: {
      root: {
        margin: "0px 8px 16px"
      },
      action: {
        margin: "0 8px"
      }
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: "#000",
        opacity: 0.9
      }
    },
    MuiButton: {
      root: {
        textTransform: "capitalize",
        marginRight: "10px"
      },
      contained: {
        fontSize: 12,
        fontWeight: 300,
        padding: "14px 20px",
        "box-shadow": "none",
        borderRadius: 3,
        "&:active": {
          boxShadow: "none"
        }
      },
      containedPrimary: {
        color: variableColor.text,
        "&:hover": {
          backgroundColor: "#31343A"
        }
      },
      containedSecondary: {
        color: variableColor.text,
        "&:hover": {
          backgroundColor: "#31343A"
        }
      },
      label: {
        position: "relative",
        zIndex: 2,
        lineHeight: 1
      },
      disabled: {
        backgroundColor: "transparent",
        color: "#83868D !important"
      }
    },
    MuiInput: {
      root: {
        marginTop: 0,
        marginBottom: 16,
        // width: '100%',
        // maxWidth: '400px',
        fontSize: 13,
        color: variableColor.text,
        "&:before, &:after": {
          display: "none"
        }
      },
      input: {
        font: "300 13px 'Open Sans', sans-serif",
        backgroundColor: variableColor.bodyBackground,
        height: "auto",
        padding: "12.5px 16px",
        lineHeight: 1,
        borderRadius: 3,
        border: "2px solid " + variableColor.text,
        "&::placeholder": {
          color: "#83868D",
          opacity: 1
        }
      },
      formControl: {},
      error: {
        borderColor: variableColor.red
      }
    },
    MuiDrawer: {
      paper: {
        backgroundColor: variableColor.bodyBackground,
        height: "100%"
      },
      // docked: {
      //   minHeight: '100vh',
      //   height: '100%',
      // },
      paperAnchorDockedLeft: {
        borderRight: 0
      },
      paperAnchorDockedRight: {
        borderLeftColor: variableColor.borderColor
      }
    },
    MuiTableRow: {
      root: {
        backgroundColor: "#35383F",
        borderBottom: "1px solid " + variableColor.borderColor,
        height: 24
      },
      head: {
        height: "40px",
        backgroundColor: variableColor.bodyBackground
      }
    },
    MuiTableCell: {
      root: {
        borderBottomColor: "#DEDEDE"
      },
      head: {
        color: variableColor.text,
        fontSize: 12,
        fontWeight: 100,
        border: 0
      },
      body: {
        color: variableColor.text,
        fontSize: 12,
        fontWeight: 100,
        border: 0
      }
    },
    MuiTablePagination: {
      caption: {
        marginRight: 20
      },
      input: {
        display: "none"
      }
    },
    MuiFormLabel: {
      root: {
        color: variableColor.text,
        fontSize: 16
      }
    },
    MuiFormControl: {
      root: {
        margin: "0px 20px",
        width: "90%"
      }
    },
    MuiFormHelperText: {
      root: {
        fontSize: 12,
        fontWeight: 400,
        margin: "0 0 10px",
        marginTop: 0
      },
      error: {
        color: variableColor.red
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiListItem: {
      root: {
        paddingTop: 4,
        paddingBottom: 4
      }
    },
    MuiListItemIcon: {
      root: {
        marginRight: 0
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: variableColor.bodyBackground
      }
    },
    MuiExpansionPanel: {
      root: {
        boxShadow: "none",
        backgroundColor: "transparent",
        "&:before": {
          display: "none"
        }
      },
      expanded: {
        margin: 0,
        "&:first-child": {
          marginTop: 0
        }
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        minHeight: "0px !important",
        padding: 0,
        "&$focused": {
          backgroundColor: "transparet"
        }
      },
      expandIcon: {
        right: 0,
        left: -16,
        zIndex: 2,
        margin: "0px !important",
        "&$expanded": {
          transform: "translateY(-50%) rotate(90deg)"
        }
      },
      content: {
        margin: "0px !important",
        zIndex: 2
      }
    },
    MuiCollapse: {
      entered: {
        overflow: "inherit"
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        color: "transparent",
        padding: 0
      }
    },
    MuiSnackbar: {
      root: {
        zIndex: 3000
      }
    },
    MuiSnackbarContent: {
      root: {
        "@media (min-width: 960px)": {
          borderRadius: 0
        }
      }
    },
    MuiToolbar: {
      gutters: {
        "@media (min-width: 960px)": {
          paddingLeft: 5,
          paddingRight: 5
        }
      }
    },
    MuiSelect: {
      root: {
        border: "2px solid " + variableColor.text,
        borderRadius: 3
      },
      select: {
        // borderRadius: 3,
        border: 0,
        backgroundColor: "transparent",
        "&:focus": {
          borderRadius: 3
        }
      },
      selectMenu: {
        height: "auto",
        padding: "11.5px 32px 11.5px 16px"
      },
      icon: {
        color: "#fff"
      }
    },
    MuiMenu: {
      paper: {
        backgroundColor: variableColor.bodyBackground,
        border: "2px solid " + variableColor.text,
        borderRadius: "0 0 3px 3px",
        marginTop: -2
      }
    },
    MuiMenuItem: {
      root: {
        // minWidth: 123,
        fontSize: 12,
        lineHeight: "16px",
        paddingTop: 3,
        paddingBottom: 3,
        height: "auto",
        color: variableColor.text,
        paddingLeft: 24.5,
        paddingRight: 24.5,
        boxSizing: "border-box",
        "&$selected": {
          backgroundColor: variableColor.primary
        }
      }
    }
  }
});

const decorate = withStyles({
  "@global": {
    body: {
      backgroundColor: variableColor.bodyBackground,
      fontSize: 12,
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      color: variableColor.text
    },
    main: {
      minHeight: "100vh"
    },
    p: {
      marginTop: 0
    },
    "[data-loading=true]": {
      "overflow-y": "hidden !important",
      "&:after": {
        content: '""',
        display: "block",
        zIndex: 3,
        width: "100%",
        height: "calc(100% - 32px)",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundSize: 40,
        /* tslint:disable-next-line:max-line-length */
        background: `${variableColor.primary}   url('data:image/svg+xml;utf8,
          <svg xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 40 40">
          <defs> <style> .cls-1, .cls-2 { fill: none; stroke-miterlimit: 10; stroke-width: 4px; }
          .cls-1 { stroke: #83868d; } .cls-2 { stroke: #ddd; opacity: 0.85; }
          @keyframes mymove { from {transform: rotate(0deg);} to {transform: rotate(360deg);} } 
          svg { animation: 1s linear 0s infinite mymove } </style> </defs> <g id="ic_loader"
          transform="translate(40) rotate(90)"> <g id="Слой_1" data-name="Слой 1"> 
          <circle id="Ellipse_4328" data-name="Ellipse 4328" class="cls-1" cx="18" cy="18"
          r="18" transform="translate(2 2)"/> <path id="Path_91" data-name="Path 91" 
          class="cls-2" d="M2,20A18,18,0,0,1,20,2"/> </g> </g> </svg>') center no-repeat`
      }
    }
    // 'a[href^="https://maps.google.com/maps"], .gm-style-cc': {
    //   display: 'none !important'
    // }
  }
});

const AppWrapper = decorate((props: any) => props.children);

const withRoot = (Component: React.ComponentType) => {
  const WithRoot = (props: object) => {
    return (
      <MuiThemeProvider theme={theme}>
        <AppWrapper>
          <CssBaseline />
          <Component {...props} />
        </AppWrapper>
      </MuiThemeProvider>
    );
  };

  return WithRoot;
};

export default withRoot;
