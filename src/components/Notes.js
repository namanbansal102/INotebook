import React, { useContext, useRef, useState ,useEffect} from "react";
import NoteItem from "./NoteItem";
import { newNoteContext } from "../App";

export default function Notes() {
  const [load, setload] = useState(null)
  const [myval, setmyval] = useState("");
  const [myvaltwo, setmyvaltwo] = useState("");
  const [myvaltag, setmyvaltag] = useState("");
  const [myid, setmyid] = useState("")
  const { myfetcher } = useContext(newNoteContext);
  const onChange = (e) => {
    setmyval(e.target.value);
    console.log(e.target.value);
  };
  const onChangetwo = (e) => {
    setmyvaltwo(e.target.value);
    console.log(e.target.value);
  };
  const onChangetag = (e) => {
    setmyvaltag(e.target.value);
    console.log(e.target.value);
  };
  const { articles } = useContext(newNoteContext);
  const ref = useRef(null);
  const updateNote = async (title, description, tag, id) => {
    console.log(id);
    ref.current.click();
    console.log("Update Note Is Running");

    setmyval(title);
    setmyvaltwo(description);
    setmyvaltag(tag);
    setmyid(id)

    return { title, description, tag, id };
  };
  
  const HandleUpdate = async (e) => {
    
    const hell="fdjk"
    console.log("Handle Update Is Running");
    console.log(myvaltwo);
    console.log(myid);
    const host = "http://localhost";
    console.log("myfetcher Function running");
    const response = await fetch(`${host}/api/notes/updateNote/${myid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title: myval,description: myvaltwo,tags:myvaltag}),
    });
   
     

    console.log("json handle update running");
    const json = await response.json();
    console.log("Your Handle Update Json is: ",json);
    console.log("json handle update complete");
  };
  
  const doubleUpdate=async(e)=>{
    e.preventDefault()
    await HandleUpdate();
    await HandleUpdate();
    setload(true)

    myfetcher();
   window.location.reload()
    
    
  }
  return (
    <>
      <h4>Your Notes </h4>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div className="row">
        {articles.map((element) => {
          return (
            <NoteItem
              className="col-md-3"
              id={element._id}
              title={element.title}
              description={element.description}
              tag={element.tags}
              updateNote={updateNote}
            />
          );
        })}
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group my-2">
                  <label for="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={myval}
                    onChange={onChange}
                    id="title"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="form-group my-2">
                  <label for="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={myvaltwo}
                    onChange={onChangetwo}
                    id="description"
                    placeholder="Description"
                  />
                </div>
              
                <button onClick={doubleUpdate} className="btn btn-danger my-2">
                  Update Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
