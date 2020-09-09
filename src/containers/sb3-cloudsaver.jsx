import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import VM from 'scratch-vm';
// import downloadBlob from '../lib/download-blob';
/**
 * Project saver component passes a downloadProject function to its child.
 * It expects this child to be a function with the signature
 *     function (downloadProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <SB3CloudSaver>{(downloadProject, props) => (
 *     <MyCoolComponent
 *         onClick={downloadProject}
 *         {...props}
 *     />
 * )}</SB3CloudSaver>
 */
class SB3CloudSaver extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'saveProjectToCloud'
        ]);
    }
    saveProjectToCloud () {
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            //截图
            var renderer = this.props.vm.renderer;
            var canvas = renderer.canvas;
            renderer.draw();
            const img = new Image();
            img.src = canvas.toDataURL('image/png', 0.7);
            // downloadBlob(this.props.projectFilename, content);
            //upload file to cloud
            console.log('--------saveProjectToCloud.content',content);
            const data = new FormData();
            data.append('file', content);  //file 相当于 input:file 中的name属性
            data.append('img',img.src);//str
            fetch('/file/upload', {
                method: 'POST',
                body: data
            }).then(response => console.log(response))
        });
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.props.className,
            this.saveProjectToCloud
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

SB3CloudSaver.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func,
    vm:PropTypes.instanceOf(VM).isRequired,
};
SB3CloudSaver.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    vm:state.scratchGui.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SB3CloudSaver);
