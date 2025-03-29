import { parse } from 'csv-parse/sync';
import fs from 'node:fs';

const input = `Course Code,Course Name,When Take (Term),Prereqs,Tags,Fall/Spring,Credits
CS101,Research and Entrepreneurship in Computing,1,NULL,Core,Fall,1
CS115,Introduction to Computer Science,1,NULL,Core,Both,3
CS135,Discrete Structures,2,NULL,Core,Both,4
CS146,Introduction to Web Programming and Project Development,7,Senior,TechE,Fall,3
CS181,Introduction to Computer Science Honors,1,Permission,Extra,Both,4
CS188,Seminar in Computer Science,2,Pinnacle,Extra,Spring,1
CS284,Data Structures,2,CS115,Core,Both,4
CS334,Theory of Computation,5,CS135 AND CS385,Core,Fall,3
CS347,Software Development Process,4+,CS115 AND CS284,TechE,Spring,3
CS370,Creative Problem Solving and Team Programming,4+,CS385,TechE,Spring,3
CS382,Computer Architecture and Organization,3,CS284,Core,Fall,4
CS385,Algorithms,3,CS181 OR 284,Core,Both,4
CS392,Systems Programming,4,CS382 AND CS385,Core,Spring,3
CS396,"Security, Privacy, and Society",5,CS392,Core,Fall,4
CS423,Senior Design I,7,CS385 AND 90Credits,Core,Fall,3
CS424,Senior Design II,8,CS423,Core,Spring,3
CS442,Database Management Systems,4+,CS385,TechE,Both,3
CS488,Computer Architecture,4+,CS382,TechE,Spring,3
CS492,Operating Systems,5+,CS392,TechE,Spring,3
CS496,Principles of Programming Languages,4,CS496,Core,Spring,3
CS503,Discrete Mathematics for Cryptography,5+,CS135 AND Junior,TechE,Both,3
CS524,Introduction to Cloud Computing,5+,CS492 AND Junior,TechE,Spring,3
CS526,Enterprise and Cloud Computing,5+,CS385 AND Junior,TechE,Fall,3
CS532,3D Computer Vision,5+,Junior,TechE,Fall,3
CS537,Interactive Computer Graphics,5+,CS385 AND Junior,TechE,Both,3
CS539,"Real-Time Rendering, Gaming, and Similations Programming",5+,CS537 AND Junior,TechE,Both,3
CS541,Artificial Intelligence,5+,MA222 AND MA232 AND Junior,TechE,Fall,3
CS544,Health Informatics,5+,Junior,TechE,Spring,3
CS548,Enterprise Software Architecture and Design,5+,CS385 AND Junior,TechE,Both,3
CS557,Introduction to Natural Language Processing,5+,Junior,TechE,Both,3
CS558,Computer Vision,5+,MA232 AND CS385 AND Junior,TechE,Spring,3
CS559,Machine Learning: Fundamentals and Applications,5+,MA222 AND MA232 AND Junior,TechE,Both,3
CS560,Statistical Machine Learning,5+,CS559 AND Junior,TechE,Both,3
CS562,Database Management Systems II,5+,CS442 AND Junior,TechE,Both,3
CS566,Smartphone and Mobile Security,5+,CS385 AND Junior,TechE,Both,3
CS574,Object-Oriented Analysis and Design,5+,CS385 AND Junior,TechE,Both,3
CS576,Systems Security,5+,CS392 AND Junior,TechE,Fall,3
CS577,Reverse Engineering and Application Analysis,5+,CS392 AND Junior,TechE,Fall,3
CS578,Privacy in a Networked World,5+,(CS579 OR CS594) AND Junior,TechE,Both,3
CS579,Foundations of Cryptography,5+,CS503 AND CS385 AND Junior,TechE,Spring,3
CS582,Causal Inference,5+,Junior,TechE,Fall,3
CS583,Deep Learning,5+,MA232 AND Junior,TechE,Both,3
CS584,Natural Language Processing,5+,MA232 AND Junior,TechE,Both,3
CS594,Enterprise and Cloud Security,5+,(CS526 OR CS548) AND Junior,TechE,Both,3
CS595,Information Security and the Law,5+,(CS579 OR CS594) AND Junior,TechE,Spring,3
CS596,Introduction to Windows Programming,5+,CS392 AND Junior,TechE,Spring,3
CS597,User Experience Design and Programming,5+,Junior,TechE,Spring,3
CS601,Algorithmic Complexity,5+,CS334 AND CS385,TechE,Both,3
CS609,Data Management and Exploration on the Web,5+,Junior,TechE,Spring,3
CS615,System Administration,5+,Junior AND Permission,TechE,Spring,3
CS643,Formal Verification of Software,5+,CS392,TechE,Both,3
CS665,Forensic Analysis,5+,CS392,TechE,Spring,3
CS676,Advance Topics in Systems and Security,5+,CS576,TechE,Spring,3
CS677,Parallel Programming for Many Core Processors,5+,CS 392,TechE,Spring,3
CS693,Cryptographic Protocols,5+,CS 579,TechE,Fall,3
CS696,Database Security,5+,Junior,TechE,Both,3
CS810,Special Topics in CS,5+,Junior,TechE,Both,3
PEP111,Mechanics,1,NULL,Science1,Both,3
PEP112,Electricity and Magnetism,2,"MA122,PEP111",Science2,Both,3
PEP221,Physics Lab I for Scientists,2,PEP111,ScienceL,Both,1
CH115,General Chemistry I,"1,2",NULL,Science1,Both,3
CH116,General Chemistry II,2,CH115,Science2,Both,3
CH117,General Chemistry Laboratory I,2,CH115,ScienceL,Both,1
BIO181,Biology and Biotechnology,2,NULL,Science2,Both,3
BIO182,Biology and Biotechnology Laboratory,2,NULL,ScienceL,Both,1
MA121,Differential Calculus,1,NULL,Core,Both,2
MA122,Integral Calculus,1,MA121,Core,Both,2
MA125,Vectors and Matrices,2,MA122,Core,Both,2
MA126,Multivariable Calculus I,2,MA125,Core,Both,2
MA222,Probability and Statistics,3,MA124 OR MA126,Core,Both,3
MA 232,Linear Algebra,3+,30Credits,MathsciE,Fall,3
MA331,Intermediate Statistics,4,MA222,Core,Both,3
HASS103,Writing and Communications Colloquium,1,NULL,Core,Both,3
HASS105,"Knoweledge, Nature, Culture",2,NULL,Core,Both,3
PRV101,First Year Experience,1,NULL,Core,Both,1
PRV201,Frontiers of Technology: AI and Machine Learning,"2,3",NULL,Core,Both,1
PRV202,Frontiers of Technology: Data Science and Analytics,"2,3",NULL,Core,Both,1
PRV203,Frontiers of Technology: Biotechnology,"2,3",NULL,Core,Both,1
PRV204,Frontiers of Technology: Sustainability,"2,3",NULL,Core,Both,1
PRV205,Frontiers of Technology: Quantum Technology,"2,3",NULL,Core,Both,1
MGT103,Introduction to Entrepreneuial Thinking,3,NULL,Core,Both,1
HPL455,Ethical Issues in Science and Technology,5,NULL,Core,Both,2
HSSC371,Computers and Society,5,NULL,Core,Both,3`;

const records = parse(input, {
    columns: true,
    skip_empty_lines: true,
});

console.log(records);
fs.writeFile('hmm.json', JSON.stringify(records), (err) => {
    if (err) console.error(err);
    else {
        console.log('File written!');
    }
});
