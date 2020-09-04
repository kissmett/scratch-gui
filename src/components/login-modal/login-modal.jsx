import Modal from '../../containers/modal.jsx';
import styles from './login-modal.css';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import SubmitLoginButton from './submit-login-button.jsx';
import connect from 'react-redux/es/connect/connect';
import {closeLoginModal} from "../../reducers/modals";
import bindAll from "lodash.bindall";


class LoginModal extends React.Component{
    constructor (props) {
        super(props);
        this.submitform = this.submitform.bind(this);

    }
    submitform(){
        let account = document.getElementById('account').value;
        let password = document.getElementById('password').value;
        fetch("/", {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "type": "formData",
            },
            body: {account:account,password:password}
        }).then(function (res) {
            if (res.ok) {
                alert("Perfect! ");
            } else if (res.status == 401) {
                alert("Oops! ");
            }
        }, function (e) {
            alert("Error submitting form!");
        });
        console.log("submit form.",account,password);
    }
    render() {
        const props = this.props;
        return (
            <Modal
                className={styles.modalContent}
                contentLabel={props.title}
                id="loginModal"
                onRequestClose={props.onCancel}
            >
                <Box>
                    <input
                        className={styles.minInput}
                        name="account"
                        id="account"
                        placeholder="账号"
                        type="text"
                    /><br/>
                    <input
                        className={styles.minInput}
                        name="password"
                        id="password"
                        placeholder="密码"
                        type="password"
                    /><br/>
                    <SubmitLoginButton className={styles.btnSubmit} onClick={this.submitform}/>
                </Box>
            </Modal>
        );
    }

}

LoginModal.propTypes = {
    title: PropTypes.string.isRequired,
    onCancel:PropTypes.func.isRequired
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    onCancel:()=>dispatch(closeLoginModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);

// export default LoginModal;
