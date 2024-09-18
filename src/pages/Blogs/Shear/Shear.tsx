import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface ShareProps {
  id: string | undefined;
}

const Shear: React.FC<ShareProps> = ({ id }) => {
  const shareUrl = `http://localhost:5173/singleBlogCard/${id}`;

  return (
    <div>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={35} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon size={35} round={true} />
      </WhatsappShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={35} round={true} />
      </LinkedinShareButton>
    </div>
  );
};

export default Shear;
