import QtQuick
import QtQuick.Layouts

import Quickshell
import Quickshell.Io
import Quickshell.Services.SystemTray
import "components/"

ColumnLayout {
    id: sidebarTop
    anchors.bottom: parent.bottom

    // clock and date widget
    Rectangle {
        id: clockContainer
        color: "#2c000000"
        border.color: "transparent"
        border.width: 1
        implicitWidth: 40
        implicitHeight: 69
        radius: 8
        Layout.alignment: Qt.AlignHCenter

        property bool showDate: false

        Process {
            id: clockProcess
            command: ["bash", "-c", "date +'%I:\n%M:\n%S \n'"]
            stdout: StdioCollector {
                onStreamFinished: {
                    if (!clockContainer.showDate) {
                        clockText.text = this.text.trim();
                    }
                }
            }
        }

        Process {
            id: dateProcess
            command: ["bash", "-c", "date +'%m-\n%d-\n%y '"]
            stdout: StdioCollector {
                onStreamFinished: {
                    if (clockContainer.showDate) {
                        clockText.text = this.text.trim();
                    }
                }
            }
        }

        Text {
            id: clockText
            font.family: "fira-code nerd font"
            text: ""
            anchors.centerIn: parent
            color: "white"
            font.pixelSize: 20
            font.bold: true
            lineHeight: 0.8
            
            Timer {
                interval: 800
                running: true
                repeat: true
                onTriggered: {
                    if (clockContainer.showDate) {
                        dateProcess.running = true;
                    } else {
                        clockProcess.running = true;
                    }
                }
            }
        }

        MouseArea {
            anchors.fill: parent
            hoverEnabled: true
            
            onEntered: {
                clockContainer.showDate = true;
                dateProcess.running = true;
            }
            
            onExited: {
                clockContainer.showDate = false;
                clockProcess.running = true;
            }
        }
    }

    // system resources popout
    Rectangle {
        color: "transparent"
        border.color: "transparent"
        border.width: 0
        implicitWidth: 46
        implicitHeight: 46

        Text {
            text: "󰍛"
            anchors.centerIn: parent
            color: "white"
            font.pixelSize: 40
        }
    }

    // battery indicator widget
    Rectangle {
        color: "transparent"
        border.color: "white"
        border.width: 0
        implicitWidth: 46
        implicitHeight: 46
        
        // gets percentage of battery 
        Process {
            id: batteryProcess
            command: ["bash", "-c", "upower -i $(upower -e | grep BAT) | grep percentage | sed 's/.*:\\s*\\([0-9]*\\)%.*/\\1/'"]

            stdout: StdioCollector {
                onStreamFinished: {
                    var output = this.text.trim();
                    batteryText.batteryPercentage = parseInt(output);
                    // Trigger the state process after percentage is done
                    batteryStateProcess.running = true;
                }
            }
        }

        // gets state of battery
        Process {
            id: batteryStateProcess
            command: ["bash", "-c", "upower -i $(upower -e | grep BAT) | grep state | sed 's/.*:\\s*\\(.*\\)/\\1/'"]

            stdout: StdioCollector {
                onStreamFinished: {
                    var output = this.text.trim();
                    
                    // Enable flashing for any battery level under 10%
                    batteryText.shouldFlash = (batteryText.batteryPercentage < 10);
                    
                    if (output === "charging") {
                        batteryText.text = '<span style="font-size:46px;">󰂄</span>';
                    } else {
                        var icon = "";
                        if (batteryText.batteryPercentage >= 90) icon = "󰁹";
                        else if (batteryText.batteryPercentage >= 80) icon = "󰂂";
                        else if (batteryText.batteryPercentage >= 70) icon = "󰂁";
                        else if (batteryText.batteryPercentage >= 60) icon = "󰂀";
                        else if (batteryText.batteryPercentage >= 50) icon = "󰁿";
                        else if (batteryText.batteryPercentage >= 40) icon = "󰁾";
                        else if (batteryText.batteryPercentage >= 30) icon = "󰁽";
                        else if (batteryText.batteryPercentage >= 20) icon = "󰁻";
                        else if (batteryText.batteryPercentage >= 10) icon = "󰁻";
                        else icon = "";

                        batteryText.text = '<span style="font-size:46px;">' + icon;
                    }
                }
            }
        }

        Timer {
            interval: 2500
            running: true
            repeat: true
            onTriggered: batteryProcess.running = true
        }

        Text {
            id: batteryText
            font.family: "fira-code nerd font"
            textFormat: Text.RichText
            text: ""
            anchors.centerIn: parent
            color: "white"
            
            property bool shouldFlash: false
            property int batteryPercentage: 0
            
            // Flashing animation for low battery
            SequentialAnimation {
                id: flashAnimation
                running: batteryText.shouldFlash
                loops: Animation.Infinite
                
                PropertyAnimation {
                    target: batteryText
                    property: "opacity"
                    from: 1.0
                    to: 0.3
                    duration: 500
                }
                PropertyAnimation {
                    target: batteryText
                    property: "opacity"
                    from: 0.3
                    to: 1.0
                    duration: 500
                }
            }
        }
    }

    // Power Button
    Rectangle {
        id: powerButtonRect
        color: "transparent"
        border.color: "transparent"
        border.width: 0
        implicitWidth: 46
        implicitHeight: 46

        Text {
            id: powerText
            font.family: "fira-code nerd font"
            text: "⏻"
            anchors.centerIn: parent
            color: "white"
            font.pixelSize: 32
        }

        MouseArea {
            anchors.fill: parent
            hoverEnabled: true
            
            onEntered: {
                powerText.color = "#57c7e9";
            }
            
            onExited: {
                powerText.color = "white";
            }
            
            onClicked: {
                // Show popup window
                console.log("Power button clicked, showing popup");
                powerMenuPopup.visible = true;
                console.log("Popup visibility set to:", powerMenuPopup.visible);
            }
        }
    }
}
