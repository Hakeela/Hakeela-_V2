// Lesson content types — shared by the course editor (admin) and the student
// lesson player so the two stay in sync.

export const LESSON_TYPES = [
  { value: "video", label: "Video", accept: "video/*" },
  { value: "audio", label: "Audio", accept: "audio/*" },
  { value: "image", label: "Picture", accept: "image/*" },
  { value: "pdf", label: "PDF", accept: "application/pdf,.pdf" },
  {
    value: "slides",
    label: "Slides",
    accept:
      ".ppt,.pptx,.key,.odp,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  {
    value: "document",
    label: "Document",
    accept:
      ".doc,.docx,.rtf,.odt,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  { value: "text", label: "Text", accept: null },
];

export const lessonTypeLabel = (v) =>
  LESSON_TYPES.find((t) => t.value === v)?.label || "Video";

export const lessonTypeAccept = (v) =>
  LESSON_TYPES.find((t) => t.value === v)?.accept || "";

/** Text lessons store their body in `transcript`; everything else uploads a file. */
export const isFileType = (v) => v !== "text";

/** PDFs (and PDF-exported slides/docs) can be embedded in an <iframe>. */
export const isPdfUrl = (url) => /\.pdf(\?|#|$)/i.test(url || "");
