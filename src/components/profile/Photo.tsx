import React from 'react';
import styled from 'styled-components';
import ModalImage from 'react-modal-image';

interface Props {
  imageUrl: string;
  caption?: string;
  likes?: number;
}

const Photo: React.FC<Props> = ({ imageUrl, caption = '', likes = 0 }) => {
  return (
    <GalleryItem tabIndex={0}>
      <Image small={imageUrl} large={imageUrl} alt={caption} />

      <div className="gallery-item-info">
        <ul>
          <li className="gallery-item-likes">
            <span className="visually-hidden">Likes:</span>
            <i className="fas fa-heart" aria-hidden="true" /> {likes}
          </li>
        </ul>
      </div>
    </GalleryItem>
  );
};

const GalleryItem = styled.div`
  position: relative;
  flex: 1 0 300px;
  margin: 15px;
  color: #fff;
  cursor: pointer;

  &:hover {
    .gallery-item-info {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      width: 100%;
      height: 20%;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const Image = styled(ModalImage)``;

export default Photo;
