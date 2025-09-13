import { Mail, Linkedin } from "lucide-react";
import { ContactLink } from '../types';

export const contactLinks: ContactLink[] = [
  {
    id: "email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=khedekarrahul4@gmail.com",
    label: "khedekarrahul4@gmail.com",
    icon: Mail,
    color: "text-purple-400",
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/in/rahulkhedekarr",
    label: "LinkedIn",
    icon: Linkedin,
    color: "text-cyan-400",
  },
];
