"use client";
import {Envelope, Pencil} from "@gravity-ui/icons";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
// import { useState } from "react";

const CommentEditModal = ({comment}) => {
    const {_id} = comment;
    console.log('id yes', _id)
    // const [comments, setComments] = useState([]);
  const updateSubmit = async(e)=>{
      e.preventDefault();
      const formData = new FormData(e.currentTarget)
      const dataFrom = Object.fromEntries(formData.entries())
      console.log(dataFrom)
     
      const res = await fetch(`http://localhost:5000/comments/${_id}`,{
         method: "PATCH",
            headers:{
                'content-type': 'application/json',
               
            },
            body:JSON.stringify(dataFrom)
      })
      const data = await res.json();
      console.log('pacth data ', data)
     
  }

    return (
      <div>
         <Modal>
      <Button type="button" className="text-zinc-500 hover:text-blue-600 transition-colors p-0 min-w-0 h-auto bg-transparent border-none shadow-none rounded-none">Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Pencil className="text-blue-500" style={{ width: '18px', height: '18px' }} />
              </Modal.Icon>
              <Modal.Heading>Update Comments</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
               Make your changes below to update your thought. Your updates will be reflected instantly in the discussion.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={updateSubmit} className="flex flex-col gap-4">
                    <div className="relative">
                    <textarea
                        rows="3"
                        name="comments"
                        defaultValue={comment.text}
                        required
                        placeholder="Share your feedback, suggestions, or ask a question about this idea..."
                        className="w-full p-4 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                </div>

                  <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" slot="close">Updata Comment</Button>
            </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    </div>
    );
};

export default CommentEditModal;