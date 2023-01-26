import { Actor } from "interfaces/MovieDetails";
import * as API from "fetch/fetch";
import React, { useEffect, useState } from "react";
import no_image_found from "assets/images/no_image_found.png";

interface ActorCardProps {
  data: Actor;
}

export const ActorCard: React.FC<ActorCardProps> = ({ data }) => {
  return (
    <div className="card_small">
      <img
        src={
          data.profile_path
            ? `https://www.themoviedb.org/t/p/w235_and_h235_face/${data.profile_path}`
            : no_image_found
        }
        alt="actor profile"
        className="cover_image"
      />

      <div className="card_description">
        <div>
          <span className="text_small">{data.character}</span>

          <span className="text_small">{data.name}</span>
        </div>
      </div>
    </div>
  );
};
