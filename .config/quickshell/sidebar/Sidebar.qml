import Quickshell
import QtQuick

PanelWindow {
    id: sidebarWindow

    // Make popup accessible to children
    property alias powerMenuPopup: powerMenuPopup

// Anchor the panel to the left and stretch vertically
    anchors {
        bottom: true
        left: true
        top: true
    }

    color: "transparent"
    margins {
        left: 8
        top: 10
        bottom: 10
    }
    // Set a fixed width for the sidebar
    implicitWidth: 46

   Rectangle {
       anchors.fill: parent
       gradient: Gradient {
           GradientStop { position: 0.0; color: "#38a6c7" }
           GradientStop { position: 1.0; color: "#e069d1" }
       }
       radius: 6
   }

   Top {
       parentWindow: sidebarWindow
   }
   Middle {}
   Bottom {
       id: bottomComponent
   }

   // Power Menu Popup Window
   PowerMenuPopup {
       id: powerMenuPopup
       parentWindow: sidebarWindow
   }
}
