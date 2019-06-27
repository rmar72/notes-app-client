import React, { Component } from 'react';
import { API, Storage } from 'aws-amplify';

export default class Notes extends Component {
    constructor(props){
        super(props);

        this.file = null;

        this.state = {
            note: null,
            content: '',
            attachmentURL: null
        };
    }

    async componentDidMount(){
        try{
            const notes = await this.notes();
            console.log("list of notes", notes);

            // let attachmentURL;
            // const note = await this.getNote();
            // console.log("a note", note)
            // const { content, attachment } = note;

            // console.log(note)

            // if(attachment){
            //     attachmentURL = await Storage.vault.get(attachment);
            // }

            // this.setState({
            //     note,
            //     content,
            //     attachmentURL
            // });
        }
        catch(e){
            console.log(e)
            alert(e);
        }
    }

    getNote(){
        return API.get('notes', `/notes/${this.props.match.params.id}`);
    }

    // this method from the other lesson works here & its a .get too! wth
    notes() {
        return API.get("notes", "/notes");
    }

    render(){
        return <div className="Notes"></div>
    }
}