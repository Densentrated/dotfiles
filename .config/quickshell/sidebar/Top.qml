
import Quickshell.Io
import "components/"
import Quickshell.Services.SystemTray

import QtQuick
import QtQuick.Layouts

ColumnLayout {
    id: sidebarTop
    anchors.top: parent.top
    property var parentWindow

    // overview toggle button
    Rectangle {

        id: overviewToggle
        color: "transparent"
        border.color: "transparent"
        border.width: 1
        implicitWidth: 46
        implicitHeight: 46

        Text {
            id: hoverIcon
            font.family: "fira-code nerd font"
            font.pixelSize: 52
            text: ""
            anchors.centerIn: parent
            color: "white"
        }

        MouseArea {
        anchors.fill: parent
        hoverEnabled: true
        onEntered: hoverIcon.color = "#e069d1"
        onExited: hoverIcon.color = "white"

            Process {
                id: overviewProcess
                command: ["bash", "-c", "niri msg action toggle-overview"]
            }

            onClicked: {
                overviewProcess.running = true
            }
        }
    }

    Rectangle {
        color: "transparent"
        border.color: "transparent"
        border.width: 0
        implicitWidth: 46
        implicitHeight: 220

        // workspaces code

        ColumnLayout {
            id: workspacesColumn
            spacing: 0
            anchors.fill: parent
            anchors.topMargin: 10

            property var workspaces: []

            Process {
                id: workspaceProcess
                running: true
                command: ["bash", "-c", "niri msg workspaces"]
                stdout: StdioCollector {
                    onStreamFinished: {
                        let lines = this.text.split('\n').filter(l => l.trim().length > 0);
                        let workspaceItems = [];

                        for (let i = 1; i < lines.length; i++) {
                            let line = lines[i].trim();
                            let active = line.startsWith("*");

                            if (active) {
                                // Active workspace: "* 4" format
                                let num = parseInt(line.substring(1).trim());
                                workspaceItems.push({ number: num, active: true });
                            } else if (!isNaN(parseInt(line))) {
                                // Regular workspace: just the number
                                let num = parseInt(line);
                                workspaceItems.push({ number: num, active: false });
                            }
                        }
                        workspacesColumn.workspaces = workspaceItems;
                    }
                }
            }

            Timer {
                interval: 250
                running: true
                repeat: true
                onTriggered: workspaceProcess.running = true
            }

            // Add workspace items here
            Repeater {
                model: workspacesColumn.workspaces

                delegate: Rectangle {
                    width: 46
                    height: 36
                    color: "transparent"
                    border.color: "transparent"
                    border.width: 0


                    Text {
                        anchors.centerIn: parent
                        color: modelData.active ? "#e069d1" : "white"
                        text: modelData.active ? "󰆦": "󰆦"
                        font.bold: true
                        font.pixelSize: 34
                    }
                }
            }

            SysTray {
                // Pass SystemTray.items directly to the component
                trayItems: SystemTray.items
                parentWindow: sidebarTop.parentWindow
                Layout.topMargin: 10
                }

            // Spacer to push everything to top of container
            Item {
                Layout.fillHeight: true
            }
            }



        // run a process to get the niri msg workspaces output
        // use  qml function to parse the output and create workspace items
        // use an icon in each workspace item, and chagne the color and symbol for the active one
    }
}
//    anchors {}
