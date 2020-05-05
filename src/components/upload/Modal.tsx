import React, { FormEvent } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';

import Icon from '../common/icon';
import { Spacer } from '../common';

interface NewPostType {
  file: File;
  description: string;
}

const NEW_POST = gql`
  mutation($file: Upload!, $description: String) {
    createPost(file: $file, description: $description) {
      imageUrl
    }
  }
`;

export default function Modal({ close }: { close: () => any }) {
  const [file, setFile] = React.useState<File>();
  const [description, setDescription] = React.useState('');
  const [newPost] = useMutation(NEW_POST);
  const pushlistNewPost = (variables: NewPostType) => {
    return newPost({
      variables,
    });
  };

  const [imageURLData, setImageUrlData] = React.useState<any>();
  const [isPublishing, setIsPublishing] = React.useState(false);

  const readURL = (input: File) => {
    return new Promise(resolve => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.readAsDataURL(input); // convert to base64 string
    });
  };

  const onDropFile = async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      console.log(acceptedFiles[0]);
      const imageData = await readURL(acceptedFiles[0]);
      setImageUrlData(imageData);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (file && description) {
      setIsPublishing(true);
      try {
        const { data, errors } = await pushlistNewPost({
          file,
          description,
        });

        if (errors) {
          toast.error('Cannot publish at the moment');
          return;
        }

        if (data.createPost.imageUrl) {
          // @ts-ignore
          window.location = window.location.href;
          close();
        }
      } catch (e) {
        toast.error('Cannot publish at the moment');
        console.error(e);
        setIsPublishing(false);
      }
    }
  };

  const loginEnabled = true;

  React.useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');

    return () => {
      document.body.setAttribute('style', 'overflow: visible');
    };
  });

  return (
    <>
      <div
        onClick={close}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 0,
        }}
      />
      <Wrapper>
        {!file && !isPublishing && (
          <Dropzone
            accept={['image/png', 'image/jpeg', 'image/jpg']}
            onDrop={onDropFile}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drop or click to upload photo to publish</p>
                  <Spacer dir="y" amount={10} />
                  <Icon size={50} name="upload" color="#000" />
                </div>
              </section>
            )}
          </Dropzone>
        )}

        {!!file && !isPublishing && !!imageURLData && (
          <Form onSubmit={onSubmit}>
            <PreviewImage src={imageURLData} />
            <TextareaWrapper>
              <TextArea
                onChange={({ currentTarget }) =>
                  setDescription(currentTarget.value)
                }
                value={description}
                placeholder="Tell something about that photo..."
              />
            </TextareaWrapper>
            <Spacer dir="y" amount={20} />
            <NewPostBtn type="submit" disabled={!loginEnabled}>
              Publish
            </NewPostBtn>
          </Form>
        )}
        {isPublishing && <IsPushingText>Publishing...</IsPushingText>}
      </Wrapper>
    </>
  );
}

const IsPushingText = styled.div``;

const PreviewImage = styled.img`
  width: 80%;
`;

const NewPostBtn = styled.button`
  border: 1px solid transparent;
  background-color: #0095f6;
  appearance: none;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 7px 9px;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  user-select: none;
  width: auto;
  color: #fff;
  outline: 0;
  border-radius: 3px;
  &:disabled {
    background-color: rgba(0, 149, 246, 0.3);
  }
`;

const Form = styled.form`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 16;
  min-width: 400px;
  min-height: 400px;
  zindex: 1;
  color: #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  text-align: center;
  outline: none;
  padding: 30px;
`;

const TextareaWrapper = styled.div`
  width: 80%;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ccc;
  background: #fff;
  margin: 0 0 5px;
  padding: 10px;
  height: 100px;
  max-width: 100%;
  resize: none;
  outline: none;
`;
