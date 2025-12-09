import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Io

PopupWindow {
    id: powerMenuPopup
    
    implicitWidth: 250
    implicitHeight: 46
    visible: false
    color: "transparent"
    
    // This will be set from the parent
    property var parentWindow: null
    
    // Anchor to the left of the sidebar 
    anchor {
        window: parentWindow
        rect {
            x: 58  // Position to the left with 10px margin
            y: 1214 // Moved down 400 pixels from -100 to 300

        }
    }
    
    // Animation for fade in from left
    onVisibleChanged: {
        if (visible) {
            fadeInAnimation.start();
        }
    }
    
    Rectangle {
        id: mainRect
        anchors.fill: parent
        opacity: 0
        transform: Translate { 
            id: translateTransform
            x: -50  // Start 50px to the left
        }
        gradient: Gradient {
            GradientStop { position: 0.0; color: "#dd6bd0" }  // Color at ~95.6% down the original gradient
            GradientStop { position: 1.0; color: "#e069d1" }  // Original bottom color
        }
        border.color: "transparent"
        border.width: 0
        radius: 6

        Row {
            anchors.centerIn: parent
            spacing: 10

            Rectangle {
                width: 40
                height: 38
                color: "transparent"
                border.color: "#38a6c7"
                border.width: 0
                radius: 4
                   
                Text {
                    anchors.centerIn: parent                        
                    text: "󰟩"
                    color: "white"
                    font.family: "fira-code nerd font"
                    font.pixelSize: 32
                }

                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: parent.color = "#38a6c7"
                    onExited: parent.color = "transparent"
                    onClicked: {
                        powerMenuPopup.visible = false;
                        shutdownProcess.running = true;
                    }
                }
            }

            Rectangle {
                width: 40
                height: 38
                color: "transparent"
                border.color: "#38a6c7"
                border.width: 0
                radius: 4

                Text {
                    anchors.centerIn: parent 
                    text: ""
                    color: "white"
                    font.family: "fira-code nerd font"
                    font.pixelSize: 30
                }

                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: parent.color = "#38a6c7"
                    onExited: parent.color = "transparent"
                    onClicked: {
                        powerMenuPopup.visible = false;
                        restartProcess.running = true;
                    }
                }
            }

            Rectangle {
                width: 38
                height: 38
                color: "transparent"
                border.color: "#38a6c7"
                border.width: 0
                radius: 4

                Text {
                    anchors.centerIn: parent 
                    text: ""
                    color: "white"
                    font.family: "fira-code nerd font"
                    font.pixelSize: 30
                }

                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: parent.color = "#38a6c7"
                    onExited: parent.color = "transparent"
                    onClicked: {
                        powerMenuPopup.visible = false;
                        suspendProcess.running = true;
                    }
                }
            }

            Rectangle {
                width: 40
                height: 38
                color: "transparent"
                border.color: "#38a6c7"
                border.width: 0
                radius: 4

                Text {
                    anchors.centerIn: parent 
                    text: "󰍃"
                    color: "white"
                    font.family: "fira-code nerd font"
                    font.pixelSize: 30
                }

                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: parent.color = "#38a6c7"
                    onExited: parent.color = "transparent"
                    onClicked: {
                        powerMenuPopup.visible = false;
                        logoutProcess.running = true;
                    }
                }
            }

            Rectangle {
                width: 40
                height: 38
                color: "transparent"
                border.color: "#38a6c7"
                border.width: 0
                radius: 4

                Text {
                    anchors.centerIn: parent 
                    text: "󰌍"
                    color: "white"
                    font.family: "fira-code nerd font"
                    font.pixelSize: 30
                }

                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: parent.color = "#38a6c7"
                    onExited: parent.color = "transparent"
                    onClicked: {
                        fadeOutAnimation.start();
                    }
                }
            }
        }
    }
    
    // Fade in animation
    ParallelAnimation {
        id: fadeInAnimation
        PropertyAnimation {
            target: mainRect
            property: "opacity"
            from: 0
            to: 1
            duration: 300
            easing.type: Easing.OutQuad
        }
        PropertyAnimation {
            target: translateTransform
            property: "x"
            from: -50
            to: 0
            duration: 300
            easing.type: Easing.OutQuad
        }
    }
    
    // Fade out animation
    ParallelAnimation {
        id: fadeOutAnimation
        PropertyAnimation {
            target: mainRect
            property: "opacity"
            from: 1
            to: 0
            duration: 300
            easing.type: Easing.InQuad
        }
        PropertyAnimation {
            target: translateTransform
            property: "x"
            from: 0
            to: -50  // Move 50px to the right
            duration: 300
            easing.type: Easing.InQuad
        }
        onFinished: {
            powerMenuPopup.visible = false;
        }
    }

    // Process for shutdown
    Process {
        id: shutdownProcess
        command: ["systemctl", "poweroff"]
    }

    // Process for restart
    Process {
        id: restartProcess
        command: ["systemctl", "reboot"]
    }

    // Process for suspend
    Process {
        id: suspendProcess
        command: ["bash", "-c", "systemctl suspend && hyprlock"]
    }

    // Process for logout
    Process {
        id: logoutProcess
        command: ["bash", "-c", "hyprlock"]
    }
}
