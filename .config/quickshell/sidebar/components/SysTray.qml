import Quickshell
import Quickshell.Services.SystemTray
import QtQuick
import QtQuick.Layouts
import QtQuick.Window

Rectangle {
    id: traySection

    property var trayItems
    property bool trayExpanded: false

    // Reference to parent window (needed for menu positioning)
    property var parentWindow

    // Get the actual sidebar height for gradient calculation
    readonly property real actualSidebarHeight: parentWindow ? parentWindow.height : 1900

    // Track which item's menu is currently open
    property var activeMenuItem: null

    // Gradient colors from Sidebar.qml
    readonly property color gradientStartColor: "#38a6c7"
    readonly property color gradientEndColor: "#e069d1"
    readonly property real sidebarTop: 0
    readonly property real sidebarGradientHeight: 1900

    // Function to interpolate between two colors based on position
    function interpolateColor(startColor, endColor, factor) {
        factor = Math.max(0, Math.min(1, factor)); // Clamp between 0 and 1

        var startR = parseInt(startColor.toString().substr(1, 2), 16);
        var startG = parseInt(startColor.toString().substr(3, 2), 16);
        var startB = parseInt(startColor.toString().substr(5, 2), 16);

        var endR = parseInt(endColor.toString().substr(1, 2), 16);
        var endG = parseInt(endColor.toString().substr(3, 2), 16);
        var endB = parseInt(endColor.toString().substr(5, 2), 16);

        var r = Math.round(startR + (endR - startR) * factor);
        var g = Math.round(startG + (endG - startG) * factor);
        var b = Math.round(startB + (endB - startB) * factor);

        return "#" +
               ("0" + r.toString(16)).slice(-2) +
               ("0" + g.toString(16)).slice(-2) +
               ("0" + b.toString(16)).slice(-2);
    }

    // Function to get gradient color at specific Y position
    function getGradientColorAtY(yPosition) {
        var factor = yPosition / actualSidebarHeight;
        return interpolateColor(gradientStartColor, gradientEndColor, factor);
    }

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

        // Button to hide/show tray
        Rectangle {
            color: "transparent"
            border.color: "transparent"
            Layout.preferredWidth: 32
            Layout.preferredHeight: 20
            Layout.alignment: Qt.AlignHCenter

            Text {
                anchors.centerIn: parent
                text: traySection.trayExpanded ? "▲" : "▼"
                color: "white"
                font.pixelSize: 12
                font.bold: true
            }

            MouseArea {
                anchors.fill: parent
                hoverEnabled: true
                onClicked: traySection.trayExpanded = !traySection.trayExpanded
            }
        }

        // Tray content (icons)
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

                    required property SystemTrayItem modelData

                    // Store consistent Y position for both tooltip and menu
                    readonly property real popupYPos: trayItem.mapToItem(null, 0, 0).y + 138
                    readonly property real menuYTop: trayItem.mapToItem(null, 0, trayItem.height / 2 - tooltipPopup.height / 2 + 138).y

                    color: iconMouseArea.containsMouse ? "#40ffffff" : "transparent"
                    radius: 4
                    Layout.preferredWidth: 32
                    Layout.preferredHeight: 30
                    Layout.alignment: Qt.AlignHCenter

                    Behavior on color {
                        ColorAnimation { duration: 150 }
                    }

                    Behavior on color {
                        ColorAnimation { duration: 150 }
                    }

                    // Attention indicator (pulsing dot)
                    Rectangle {
                        visible: modelData.status === Status.NeedsAttention
                        anchors.right: parent.right
                        anchors.top: parent.top
                        anchors.margins: 2
                        width: 6
                        height: 6
                        radius: 3
                        color: "#ff5555"
                        z: 1

                        SequentialAnimation on opacity {
                            running: modelData.status === Status.NeedsAttention
                            loops: Animation.Infinite
                            NumberAnimation { to: 0.3; duration: 500 }
                            NumberAnimation { to: 1.0; duration: 500 }
                        }
                    }

                    Image {
                        id: trayIconImage
                        anchors.centerIn: parent
                        source: modelData ? modelData.icon : ""
                        width: 24
                        height: 24
                        smooth: true
                        fillMode: Image.PreserveAspectFit

                        opacity: {
                            if (!modelData) return 1.0;
                            switch (modelData.status) {
                                case Status.Passive: return 0.5;
                                case Status.Active: return 1.0;
                                case Status.NeedsAttention: return 1.0;
                                default: return 1.0;
                            }
                        }

                        Behavior on opacity {
                            NumberAnimation { duration: 200 }
                        }
                    }

                    // Mouse interaction
                    MouseArea {
                        id: iconMouseArea
                        anchors.fill: parent
                        acceptedButtons: Qt.LeftButton | Qt.RightButton | Qt.MiddleButton
                        hoverEnabled: true

                        onClicked: function(mouse) {
                            if (!modelData) return;

                            if (mouse.button === Qt.LeftButton || mouse.button === Qt.RightButton) {
                                if (modelData.hasMenu) {
                                    // Toggle menu
                                    if (traySection.activeMenuItem === modelData) {
                                        traySection.activeMenuItem = null;
                                    } else {
                                        traySection.activeMenuItem = modelData;
                                    }
                                } else if (mouse.button === Qt.LeftButton) {
                                    modelData.activate();
                                }
                            } else if (mouse.button === Qt.MiddleButton) {
                                modelData.secondaryActivate();
                            }
                        }

                        onWheel: function(wheel) {
                            if (!modelData) return;
                            modelData.scroll(wheel.angleDelta.y / 120, false);
                        }

                        onEntered: {
                            tooltipTimer.start();
                        }

                        onExited: {
                            tooltipTimer.stop();
                            tooltipPopup.visible = false;
                        }
                    }

                    // Tooltip timer
                    Timer {
                        id: tooltipTimer
                        interval: 500
                        onTriggered: {
                            if (iconMouseArea.containsMouse && modelData && !traySection.activeMenuItem) {
                                tooltipPopup.visible = true;
                            }
                        }
                    }

                    // Tooltip popup
                    PopupWindow {
                        id: tooltipPopup
                        visible: false
                        color: "#00000000"

                        implicitWidth: tooltipText.implicitWidth + 16
                        implicitHeight: tooltipText.implicitHeight + 8

                        anchor.window: traySection.parentWindow
                        anchor.rect.x: trayItem.mapToItem(null, trayItem.width + 18, 0).x
                        anchor.rect.y: trayItem.mapToItem(null, 0, trayItem.height / 2 - tooltipPopup.height / 2 + 138).y

                        Rectangle {
                            anchors.fill: parent
                            color: {
                                if (tooltipPopup.visible) {
                                    var yPos = trayItem.mapToItem(null, 0, trayItem.height / 2 - tooltipPopup.height / 2 + 138).y;
                                    return traySection.getGradientColorAtY(yPos);
                                }
                                return "#2d2d2d";
                            }
                            border.color: "#555555"
                            border.width: 0
                            radius: 4
                            opacity: 0.95

                            Text {
                                id: tooltipText
                                anchors.centerIn: parent
                                text: {
                                    if (!modelData) return "";
                                    return modelData.tooltipTitle || modelData.title || modelData.id || "";
                                }
                                color: "#ffffff"
                                font.pixelSize: 12
                            }
                        }
                    }

                    // Custom styled menu popup
                    PopupWindow {
                        id: menuPopup
                        visible: traySection.activeMenuItem === modelData
                        color: "#00000000"

                        implicitWidth: 200
                        implicitHeight: menuColumn.implicitHeight + 16

                        anchor.window: traySection.parentWindow
                        anchor.rect.x: trayItem.mapToItem(null, trayItem.width + 18, 0).x
                        anchor.rect.y: trayItem.mapToItem(null, 0, trayItem.height / 2 - tooltipPopup.height / 2 + 138).y

                        // Close menu when clicking outside
                        onVisibleChanged: {
                            if (!visible && traySection.activeMenuItem === modelData) {
                                traySection.activeMenuItem = null;
                            }
                        }

                        Rectangle {
                            anchors.fill: parent

                            // ========== MENU STYLING ==========
                            color: "transparent"
                            border.width: 0
                            radius: 8
                            opacity: 0.95

                            gradient: Gradient {
                                GradientStop {
                                    position: 0.0
                                    color: {
                                        if (menuPopup.visible && menuPopup.implicitHeight > 0) {
                                            console.log("Menu Top Y:", trayItem.menuYTop, "Sidebar Height:", traySection.actualSidebarHeight, "Color:", traySection.getGradientColorAtY(trayItem.menuYTop));
                                            return traySection.getGradientColorAtY(trayItem.menuYTop);
                                        }
                                        return "#1a1a2e";
                                    }
                                }
                                GradientStop {
                                    position: 1.0
                                    color: {
                                        if (menuPopup.visible && menuPopup.implicitHeight > 0) {
                                            var yBottom = trayItem.menuYTop + menuPopup.implicitHeight;
                                            console.log("Menu Bottom Y:", yBottom, "Height:", menuPopup.implicitHeight, "Sidebar Height:", traySection.actualSidebarHeight, "Color:", traySection.getGradientColorAtY(yBottom));
                                            return traySection.getGradientColorAtY(yBottom);
                                        }
                                        return "#1a1a2e";
                                    }
                                }
                            }

                            ColumnLayout {
                                id: menuColumn
                                anchors.fill: parent
                                anchors.margins: 8
                                spacing: 2

                                // Menu opener to access menu items
                                QsMenuOpener {
                                    id: menuOpener
                                    menu: modelData ? modelData.menu : null
                                }

                                // Render each menu item
                                Repeater {
                                    model: menuOpener.children


                                    delegate: Rectangle {
                                        id: menuItemRect

                                        required property QsMenuEntry modelData

                                        Layout.fillWidth: true
                                        Layout.preferredHeight: {
                                            if (modelData.isSeparator) return 9;
                                            return 32;
                                        }

                                        // ========== MENU ITEM STYLING ==========
                                        color: {
                                            if (modelData.isSeparator) return "transparent";
                                            if (!modelData.enabled) return "transparent";
                                            return menuItemMouse.containsMouse ? "#40ffffff" : "transparent";
                                        }
                                        radius: 4

                                        // Separator line
                                        Rectangle {
                                            visible: modelData.isSeparator
                                            anchors.centerIn: parent
                                            width: parent.width - 16
                                            height: 1
                                            color: "#404040"        // Separator color
                                        }

                                        // Menu item content
                                        RowLayout {
                                            visible: !modelData.isSeparator
                                            anchors.fill: parent
                                            anchors.leftMargin: 8
                                            anchors.rightMargin: 8
                                            spacing: 8

                                            // Checkmark for checkable items
                                            Text {
                                                visible: modelData.checkState !== Qt.Unchecked
                                                text: modelData.checkState === Qt.Checked ? "✓" : "•"
                                                color: "#ffffff"
                                                font.pixelSize: 12
                                                Layout.preferredWidth: 16
                                            }

                                            // Spacer if no checkmark
                                            Item {
                                                visible: modelData.checkState === Qt.Unchecked
                                                Layout.preferredWidth: 16
                                            }

                                            // Icon (if available)
                                            Image {
                                                visible: modelData.icon !== ""
                                                source: modelData.icon
                                                Layout.preferredWidth: 16
                                                Layout.preferredHeight: 16
                                                fillMode: Image.PreserveAspectFit
                                            }

                                            // Menu item text
                                            Text {
                                                text: modelData.text || ""
                                                color: modelData.enabled ? "#ffffff" : "#999999"
                                                font.pixelSize: 13
                                                Layout.fillWidth: true
                                                elide: Text.ElideRight
                                            }

                                            // Submenu arrow
                                            Text {
                                                visible: modelData.hasChildren
                                                text: "›"
                                                color: "#888888"    // Arrow color
                                                font.pixelSize: 16
                                            }
                                        }

                                        MouseArea {
                                            id: menuItemMouse
                                            anchors.fill: parent
                                            hoverEnabled: true
                                            enabled: !modelData.isSeparator && modelData.enabled

                                            onClicked: {
                                                if (modelData.hasChildren) {
                                                    // TODO: Handle submenus
                                                    console.log("Submenu:", modelData.text);
                                                } else {
                                                    // Trigger the action
                                                    modelData.triggered();
                                                    traySection.activeMenuItem = null;
                                                }
                                            }
                                        }
                                    }
                                }
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
    }

    // Click outside to close menu
    MouseArea {
        anchors.fill: parent
        enabled: traySection.activeMenuItem !== null
        onClicked: traySection.activeMenuItem = null
        z: -1
    }
}
