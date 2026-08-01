import { Mail, Linkedin } from "lucide-react";
import { ContactLink } from "../types";

const EMAIL = "khedekarrahul4@gmail.com";

const emailSubject = "Project inquiry — Rahul Khedekar";

const emailBody = `Hi Rahul,

I'd like to discuss a project.

What I'm building:
-

Goals / outcome:
-

Timeline:
-

Budget range (optional):
-

Best,
`;

export const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

export const contactLinks: ContactLink[] = [
  {
    id: "email",
    href: emailComposeUrl,
    label: EMAIL,
    icon: Mail,
    color: "text-sharp-accent",
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/in/rahulkhedekarr",
    label: "LinkedIn",
    icon: Linkedin,
    color: "text-sharp-accent",
  },
];
