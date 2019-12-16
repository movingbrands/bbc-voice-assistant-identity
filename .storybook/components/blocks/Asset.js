import React from "react";

import { Video } from "./Video";
import { Image } from "./Image";

export const Asset = props =>
  props.type === "video" ? <Video {...props} /> : <Image {...props} />;
