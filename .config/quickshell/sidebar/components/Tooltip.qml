import Quickshell
import QtQuick

FloatingWindow {
    id: tooltipWindow
    width: 200
    height: 50
    color: "transparent"
    visible: true
    
    // Window flags for tooltip behavior
    flags: Qt.ToolTip | Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint
    
    property string tooltipText: ""
    
    Rectangle {
        id: tooltipContent
        anchors.fill: parent
        color: "#E0E0E0"
        border.color: "#808080"
        border.width: 1
        radius: 4
        
        Text {
            anchors.centerIn: parent
            anchors.margins: 8
            text: tooltipWindow.tooltipText
            color: "black"
            font.pixelSize: 12
            wrapMode: Text.WordWrap
            width: parent.width - 16
        }
    }
}