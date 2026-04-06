import Image from "next/image";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="space-y-8">
      {images.map((image, index) => (
        <div key={image} className={index % 2 ? "md:ml-20" : "md:mr-20"}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={image}
              alt={`${title} - hình ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
