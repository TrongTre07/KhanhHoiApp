import React, { Component } from 'react';
import { AppRegistry, Button, StyleSheet, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
// import PSPDFKitView from 'react-native-pspdfkit';

export default class OpenPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document: null,
        };
    }

    async handleDocumentPick() {
        try {
            const file = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                copyTo: 'documentDirectory',
            });
            this.setState({
                document: decodeURI(
                    file.fileCopyUri.replace('file://', ''),
                ),
            });
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                // Người dùng đã hủy chọn tài liệu.
            } else {
                throw error;
            }
        }
    }

    handleNavigationButtonClicked() {
        this.setState({ document: null });
    }

    handleCloseButtonPressed() {
        this.setState({ document: null });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.document == null ? (
                    <View style={styles.container}>
                        <Button
                            onPress={async () => await this.handleDocumentPick()}
                            title="Open a PDF Document..."
                        />
                    </View>
                ) : (
                    <PSPDFKitView
                        ref="pdfView"
                        // Set the document.
                        document={this.state.document}
                        // Show the back button on Android.
                        showNavigationButtonInToolbar={true}
                        // Show the back button on iOS.
                        showCloseButton={true}
                        // The configuration is optional.
                        configuration={{
                            showThumbnailBar: 'scrollable',
                        }}
                        // Set the document to `null` on Android.
                        onNavigationButtonClicked={(event) => {
                            this.setState({ document: null });
                        }}
                        // Set the document to `null` on iOS.
                        onCloseButtonPressed={(event) => {
                            this.setState({ document: null });
                        }}
                        style={{ flex: 1 }}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

// Vì không có AppRegistry trong JavaScript thuần, bạn không cần đăng ký thành phần.
// Thay vào đó, bạn nên render component này trong ứng dụng của bạn bằng một cơ chế render của React.