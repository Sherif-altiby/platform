'use client'

import Image from "next/image"
import Link from "next/link"
import { CiVideoOff } from "react-icons/ci"

function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

type VideoCardProps = {
  name: string;
  teacherId: string;
  title: string;
  videoId: string | null | RegExpMatchArray;
};

const VideoCard = ({ name, teacherId, title, videoId }: VideoCardProps) => {
  const id = getYouTubeVideoId(videoId as string);
  const videoThumbnail = id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : '/video-icon.svg';

  const isValidVideo = !!id;

  return (
    <Link
      href={
        isValidVideo
          ? `/get-teachers/videos/watch?teacherName=${name}&teacherId=${teacherId}&videoId=${id}`
          : "#"
      }
      className="block rounded-xl bg-white shadow-sm p-4 transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
    >
      <div className="relative w-full h-[180px] overflow-hidden rounded-lg bg-gray-200">
        {isValidVideo ? (
          <Image
            src={videoThumbnail}
            alt="Video Thumbnail"
            width={320}
            height={180}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            <CiVideoOff size={48} />
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-lg font-semibold text-hoverLinkColor truncate">
        {title}
      </div>
    </Link>
  );
};

export default VideoCard;
