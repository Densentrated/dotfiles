import Quickshell
import Quickshell.Services.SystemTray
import QtQuick
import QtQuick.Layouts
import QtQuick.Window

Rectangle {
    id: traySection
    
    property var trayItems
    property bool trayExpanded: false
    
    // Simple tooltip overlay
    
    color: "#2c000000"
    height: traySection.trayExpanded ? 220 : 38
    width: 40
    radius: 8
    Layout.alignment: Qt.AlignHCenter
    
    // Prevent layout changes from affecting this widget's size
    Layout.preferredWidth: 40
    Layout.preferredHeight: traySection.trayExpanded ? 220 : 38
    Layout.minimumWidth: 40
    Layout.maximumWidth: 40
    
    // Animate height changes
    Behavior on height {
        NumberAnimation {
            duration: 300
            easing.type: Easing.OutCubic
        }
    }
    
    // Also animate the layout preferred height
    Behavior on Layout.preferredHeight {
        NumberAnimation {
            duration: 300
            easing.type: Easing.OutCubic
        }
    }
    
    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 4
        spacing: 10

        // button to hide tray
        Rectangle {
            color: "transparent"
            border.color: "transparent"
            Layout.preferredWidth: 32
            Layout.preferredHeight: 20
            Layout.alignment: Qt.AlignHCenter
            
            Text {
                anchors.centerIn: parent
                text: traySection.trayExpanded ? "" : ""
                color: "white"
                font.pixelSize: 14
                font.bold: true
            }
            
            MouseArea {
                anchors.fill: parent
                hoverEnabled: true
                onClicked: traySection.trayExpanded = !traySection.trayExpanded
            }
        }

        // Tray content (spacer + icons)
        ColumnLayout {
            id: trayContent
            visible: traySection.trayExpanded
            Layout.fillWidth: true
            Layout.fillHeight: true
            spacing: 2
            
            // System tray items
            Repeater {
                id: trayRepeater
                model: traySection.trayItems
                
                delegate: Rectangle {
                    id: trayItem
                    color: "transparent"
                    Layout.preferredWidth: 32
                    Layout.preferredHeight: 30
                    Layout.alignment: Qt.AlignHCenter
                    
                    property var currentTooltip: null
                    
                    Image {
                        anchors.centerIn: parent
                        source: modelData ? modelData.icon : ""
                        width: 24
                        height: 24
                        smooth: true

                        opacity: {
                            switch (modelData.status) {
                                case SystemTrayStatus.Passive: return 0.6
                                case SystemTrayStatus.Active: return 1.0
                                case SystemTrayStatus.NeedsAttention: return 1.0
                            }
                        }

                        // Mouse interaction
                        MouseArea {
                            anchors.fill: parent
                            acceptedButtons: Qt.LeftButton | Qt.RightButton
                            hoverEnabled: true
                            
                            onClicked: function(mouse) {
                            
                            }
   
                            onEntered: {
                                floatingWindow.visible = true;
                            }
                            
                            onExited: {
                                floatingWindow.visible = false;
                            }
                        }
                    } 
                }
            }

            // Spacer to push items to top
            Item {
                Layout.fillHeight: true
            }
        }

            PopupWindow {
            id: floatingWindow
            width: 200
            height: 150
            visible: false
            
            anchor.window: toplevel
            anchor.rect.x: parentWindow.width / 2 - width / 2
            anchor.rect.y: parentWindow.height
           
            Rectangle {
                anchors.fill: parent
                color: "white"
                border.color: "gray"
                border.width: 1
            }
        }
    }
}