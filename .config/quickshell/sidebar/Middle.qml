import QtQuick
import QtQuick.Layouts

import Quickshell.Io

ColumnLayout {
    id: sidebarTop

    anchors.centerIn: parent

    Rectangle {
        color: "transparent"
        border.color: "transparent"
        border.width: 1
        implicitWidth: 46
        implicitHeight: 500

        Text {
            id: windowName
            font.family: "fira-code nerd font"
            text: ""
            color: "white"
            anchors.centerIn: parent
            font.pixelSize: 20
            width: 400
            elide: Text.ElideRight
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
            transform: Rotation {
                angle: -90
                origin.x: windowName.width / 2
                origin.y: windowName.height / 2
            }
            anchors.verticalCenter: parent.verticalCenter
            anchors.right: parent.right
            anchors.rightMargin: 0

            Process {
                id: windowNameProcess
                command: ["bash", "-c", "niri msg focused-window | grep 'Title:' | sed -n 's/.*Title: \"\\(.*\\)\".*/\\1/p'"]

                stdout: StdioCollector {
                    onStreamFinished: {
                        var output = this.text.trim();
                        windowName.text = output === "" ? "niri" : output;
                    }
                }
            }

            Timer {
                interval: 250
                running: true
                repeat: true
                onTriggered: windowNameProcess.running = true
            }
        }
    }
}
//    anchors {}