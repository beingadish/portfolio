import type { LanguageCode } from "./translations";

export type AudioTourBrief = {
  id: "intro" | "footprint" | "mindset" | "experience" | "projects" | "connect";
  title: string;
  targetElementId: string;
  text: string;
};

export const AUDIO_TOURS: Record<LanguageCode, AudioTourBrief[]> = {
  en: [
    {
      id: "intro",
      title: "Introduction",
      targetElementId: "hero",
      text: "Hi, I'm Aadarsh Pandey. I'm a software engineer based in Bengaluru, specializing in scalable backend microservices, distributed architectures, and Generative AI. Over the years, I've focused on building resilient systems that handle real-world scale with high throughput and low latency. Welcome to my portfolio! Here you can explore the production systems I've built, my engineering philosophy, and my open-source projects.",
    },
    {
      id: "footprint",
      title: "At Work",
      targetElementId: "telemetry",
      text: "At Accenture, I work on mission-critical enterprise systems. In transit ticketing, I engineered high-throughput Java Spring Boot REST microservices processing over a million daily passenger transactions across ten transit agencies, cutting payment API latency by thirty-five percent through Redis caching and SQL query tuning. Currently, I contribute to an industrial IoT fleet telemetry platform on AWS, ingesting high-frequency machine signals using AWS IoT Core, MQTT, Lambda, Kinesis, and DynamoDB with resilient retry policies and idempotent validation.",
    },
    {
      id: "mindset",
      title: "Engineering Mindset",
      targetElementId: "doctrine",
      text: "When building software, I believe systems should be observable, predictable, and mechanically sympathetic to the hardware beneath them. I prioritize deep runtime observability down to the microsecond using Micrometer metrics, structured tracing, and transparent alerts over guesswork. Reliability isn't an afterthought: graceful circuit breaking, partitioned event streams in Kafka, and deterministic failure modes ensure that systems remain rock solid even under peak loads.",
    },
    {
      id: "experience",
      title: "Work & Production Impact",
      targetElementId: "experience",
      text: "Looking at my career journey, my engineering background spans backend APIs, distributed workflows, and mobile integrations. Alongside my microservice work at Accenture, I developed core Android features with MVVM architecture, Retrofit, and integrated POS hardware SDKs for contactless transit card payments with a ninety-nine percent transaction success rate. Earlier in my career, during my internships at Ostello and BlupX, I re-architected mobile state management to slash load times by seventy-eight percent and built secure booking backends with Razorpay payments and Google Maps integrations.",
    },
    {
      id: "projects",
      title: "Featured Projects & Toolkit",
      targetElementId: "projects",
      text: "Beyond my professional work, I actively build open-source systems that tackle modern architectural challenges. My project TalkingYouTube is an interactive multimodal system that lets users query and converse with YouTube videos through semantic search, LangChain, and FAISS vector embeddings. I also designed KubeTransit, a fully containerized microservice suite deployed on Kubernetes k3s with Bucket4j rate limiting, Kafka event queues, and live Prometheus observability dashboards that mirror production scale.",
    },
    {
      id: "connect",
      title: "Let's Connect",
      targetElementId: "contact",
      text: "Thank you for exploring my work! I am always open to discussing backend architecture, distributed systems, or high-impact software engineering roles. If you're building systems that need performance, reliability, and careful engineering, feel free to reach out to me directly via email or connect on LinkedIn and GitHub. I'd love to chat and see how we can build something great together!",
    },
  ],
  hi: [
    {
      id: "intro",
      title: "परिचय",
      targetElementId: "hero",
      text: "नमस्ते! मैं आदर्श पाण्डेय हूँ। मैं बेंगलुरु में कार्यरत एक बैकएंड सॉफ्टवेयर इंजीनियर हूँ, जो मुख्य रूप से स्केलेबल माइक्रोसर्विसेज, डिस्ट्रिब्यूटेड सिस्टम्स और जेनरेटिव एआई पर काम करता हूँ। पिछले कुछ वर्षों में, मेरा पूरा ध्यान ऐसे मजबूत सिस्टम बनाने पर रहा है जो अत्यधिक लोड में भी बिना किसी रुकावट के लगातार काम करें। मेरे पोर्टफोलियो में आपका स्वागत है! यहाँ आप मेरे प्रोडक्शन प्रोजेक्ट्स, मेरी इंजीनियरिंग सोच और मेरे ओपन-सोर्स काम को करीब से देख सकते हैं।",
    },
    {
      id: "footprint",
      title: "कार्यक्षेत्र",
      targetElementId: "telemetry",
      text: "एक्सेंचर में, मैं बड़े पैमाने के मिशन-क्रिटिकल सिस्टम्स पर काम करता हूँ। ट्रांजिट टिकटिंग के क्षेत्र में, मैंने जावा स्प्रिंग बूट आधारित हाई-थ्रूपुट माइक्रोसर्विसेज तैयार की हैं, जो प्रतिदिन दस से अधिक ट्रांसपोर्ट एजेंसियों के दस लाख से ज्यादा लेनदेन प्रोसेस करती हैं। यहाँ हमने रेडिस कैशिंग और डेटाबेस ऑप्टिमाइजेशन से लेटेंसी में पैंतीस प्रतिशत की कमी दर्ज की। वर्तमान में, मैं एडब्ल्यूएस पर इंडस्ट्रियल आईओटी फ्लीट टेलीमेट्री प्लेटफॉर्म पर काम कर रहा हूँ, जहाँ भारी मशीनरी के डेटा को आईओटी कोर, एमक्यूटीटी और काइनेसिस के जरिए सुरक्षित और बिना किसी डेटा लॉस के प्रोसेस किया जाता है।",
    },
    {
      id: "mindset",
      title: "इंजीनियरिंग सोच",
      targetElementId: "doctrine",
      text: "सॉफ्टवेयर बनाते समय मेरी सोच हमेशा तीन मुख्य सिद्धांतों पर टिकी होती है: गहरी विश्वसनीयता, हार्डवेयर की समझ और कोड की स्पष्टता। मैं सिस्टम के हर माइक्रोसेकंड को माइक्रोमीटर, प्रोमेथियस और ग्राफाना के जरिए पारदर्शी और मापने योग्य बनाने में विश्वास रखता हूँ। मेरे लिए सिस्टम की मजबूती सिर्फ कोड लिखने तक सीमित नहीं है, बल्कि काफ़्का के साथ पार्टीशंड इवेंट पाइपलाइन्स, सर्किट ब्रेकिंग और सुरक्षित फेल्योर मोड्स के जरिए ऐसी नींव तैयार करना है जो किसी भी अप्रत्याशित लोड में डिगने न पाए।",
    },
    {
      id: "experience",
      title: "अनुभव और प्रभाव",
      targetElementId: "experience",
      text: "मेरे करियर के सफर पर नज़र डालें, तो मेरा अनुभव बैकएंड एपीआई, डिस्ट्रीब्यूटेड वर्कफ़्लो और मोबाइल आर्किटेक्चर तीनों में फैला हुआ है। एक्सेंचर में बैकएंड के साथ-साथ, मैंने एंड्रॉइड पर एमवीवीएम आर्किटेक्चर के जरिए एनएफसी रीडर और क्यूआर स्कैनर जैसे पीओएस हार्डवेयर एसडीके इंटीग्रेट किए, जहाँ हमने निन्यानवे प्रतिशत से अधिक की सफलता दर हासिल की। इससे पहले, ऑस्टेलो और ब्लूपएक्स में अपने इंटर्नशिप के दौरान, मैंने रिवरपॉड से ऐप आर्किटेक्चर को री-डिजाइन करके लोड समय को अठहत्तर प्रतिशत तक घटाया और रेज़रपे पेमेंट्स के साथ सुरक्षित बुकिंग वर्कफ़्लो तैयार किए।",
    },
    {
      id: "projects",
      title: "प्रोजेक्ट्स और टूल्स",
      targetElementId: "projects",
      text: "दैनिक काम के अलावा, मुझे नई तकनीकी चुनौतियों को हल करने वाले ओपन-सोर्स प्रोजेक्ट्स बनाना बेहद पसंद है। मेरा प्रोजेक्ट टॉकिंगयूट्यूब एक आधुनिक मल्टीमॉडल एआई सिस्टम है, जहाँ यूजर्स लैंगचेन और एफएआईएसएस वेक्टर एम्बेडिंग्स की मदद से यूट्यूब वीडियोज के साथ सीधा संवाद कर सकते हैं। इसके अलावा, मैंने क्यूब-ट्रांजिट डिजाइन किया है, जो कुबरनेट्स के3एस पर चलने वाली कंटेनराइज्ड माइक्रोसर्विसेज का एक पूरा सूट है, जिसमें बकेट-फॉर-जे रेट लिमिटिंग, काफ़्का मैसेजिंग और लाइव प्रोमेथियस डैशबोर्ड्स शामिल हैं।",
    },
    {
      id: "connect",
      title: "संपर्क करें",
      targetElementId: "contact",
      text: "मेरे काम और पोर्टफोलियो को देखने के लिए आपका बहुत-बहुत धन्यवाद! मैं बैकएंड आर्किटेक्चर, डिस्ट्रीब्यूटेड सिस्टम्स और बड़े पैमाने के सॉफ्टवेयर इंजीनियरिंग प्रोजेक्ट्स पर चर्चा के लिए हमेशा तैयार रहता हूँ। अगर आप ऐसा कोई सिस्टम बना रहे हैं जहाँ उच्च प्रदर्शन, स्थिरता और मजबूत इंजीनियरिंग की जरूरत है, तो आप नीचे दिए गए ईमेल लिंक या लिंक्डइन के जरिए मुझसे सीधे संपर्क कर सकते हैं। आपसे बातचीत करने का मुझे बेसब्री से इंतजार रहेगा!",
    },
  ],
  sa: [
    {
      id: "intro",
      title: "परिचयः",
      targetElementId: "hero",
      text: "सर्वेभ्यो नमः! अहम् आदर्श पाण्डेयः। अहम् एकः पश्चभाग-तन्त्रांश-अभियन्ता अस्मि, यस्य वितरितासु प्रणालीषु तथा नूतन-कृत्रिमबुद्धौ च गभीरः अनुरागः अनुभवश्च वर्तते। मम पोर्टफोलियो-मध्ये भवतां स्वागतम्!",
    },
    {
      id: "footprint",
      title: "कार्यक्षेत्रम्",
      targetElementId: "telemetry",
      text: "एक्सेञ्चर्-संस्थायां, मया प्रतिदिनं लक्षाधिक-व्यवहार-युक्ताः गमनागमन-सेवाः तथा यानानां दूरमापन-प्रणाल्यः एडब्ल्यूएस-माध्यमेन सफलीकृताः।",
    },
    {
      id: "mindset",
      title: "अभियान्त्रिकी-दृष्टिः",
      targetElementId: "doctrine",
      text: "मम अभियान्त्रिकी-दृष्टिः सर्वदा प्रणाली-स्थिरतायाः, हार्डवेयर-सामञ्जस्यस्य, स्वच्छ-सङ्केत-लेखनस्य च पक्षे अस्ति।",
    },
    {
      id: "experience",
      title: "अनुभवः प्रभावश्च",
      targetElementId: "experience",
      text: "मम कार्ययात्रायां मया उच्च-प्रदर्शन-युक्ताः पश्चभाग-सेवासङ्ग्रहाः तथा सुदृढाः एण्ड्रॉयड-सङ्केताः सफलाः कृताः।",
    },
    {
      id: "projects",
      title: "प्रकल्पाः",
      targetElementId: "projects",
      text: "टॉकिंग-यूट्यूब तथा कुबरनेट्स-सञ्चालित-क्यूबट्रांजिट् सदृशाः नूतनाः प्रकल्पाः मया रचिताः सन्ति।",
    },
    {
      id: "connect",
      title: "सम्पर्कः",
      targetElementId: "contact",
      text: "मम कार्यं दृष्टवद्भ्यः हार्दाः धन्यवादाः! सहकार्याय मां विद्युत्पत्रेण सम्पर्कं कुर्वन्तु।",
    },
  ],
  kn: [
    {
      id: "intro",
      title: "ಪರಿಚಯ",
      targetElementId: "hero",
      text: "ನಮಸ್ಕಾರ! ನಾನು ಆದರ್ಶ್ ಪಾಂಡೆ. ಬೆಂಗಳೂರಿನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಸಾಫ್ಟ್‌ವೇರ್ ಇಂಜಿನಿಯರ್. ಸ್ಕೇಲೆಬಲ್ ಬ್ಯಾಕೆಂಡ್ ವ್ಯವಸ್ಥೆಗಳು, ವಿತರಿಸಿದ ಆರ್ಕಿಟೆಕ್ಚರ್ ಮತ್ತು ಜನರೇಟಿವ್ ಎಐ ತಂತ್ರಜ್ಞಾನದಲ್ಲಿ ನನಗೆ ಅಪಾರ ಆಸಕ್ತಿ ಮತ್ತು ಅನುಭವವಿದೆ.",
    },
    {
      id: "footprint",
      title: "ಉದ್ಯೋಗ ಕ್ಷೇತ್ರ",
      targetElementId: "telemetry",
      text: "ಅಕ್ಸೆಂ oliveಚರ್‌ನಲ್ಲಿ, ಪ್ರತಿದಿನ ಹತ್ತು ಲಕ್ಷಕ್ಕೂ ಹೆಚ್ಚು ಟ್ರಾನ್ಸಿಟ್ ವಹಿವಾಟುಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಸ್ಪ್ರಿಂಗ್ ಬೂಟ್ ಮೈಕ್ರೋಸರ್ವೀಸ್‌ಗಳು ಮತ್ತು ಎಡಬ್ಲ್ಯೂಎಸ್ ಐಒಟಿ ಫ್ಲೀಟ್ ಟೆಲಿಮೆಟ್ರಿ ವ್ಯವಸ್ಥೆಗಳನ್ನು ನಾನು ವಿನ್ಯಾಸಗೊಳಿಸಿದ್ದೇನೆ.",
    },
    {
      id: "mindset",
      title: "ಇಂಜಿನಿಯರಿಂಗ್ ತತ್ವಗಳು",
      targetElementId: "doctrine",
      text: "ಸಾಫ್ಟ್‌ವೇರ್ ನಿರ್ಮಿಸುವಾಗ ನನ್ನ ಮುಖ್ಯ ಗುರಿ ಸಿಸ್ಟಮ್ ವಿಶ್ವಾಸಾರ್ಹತೆ, ಹಾರ್ಡ್‌ವೇರ್ ಅರಿವು ಮತ್ತು ಸ್ಪಷ್ಟ ಕೋಡಿಂಗ್ ಶೈಲಿ.",
    },
    {
      id: "experience",
      title: "ಅನುಭವ ಮತ್ತು ಪ್ರಭಾವ",
      targetElementId: "experience",
      text: "ಅಕ್ಸೆಂ oliveಚರ್‌ನಲ್ಲಿ ಬ್ಯಾಕೆಂಡ್ ಮೈಕ್ರೋಸರ್ವೀಸ್‌ಗಳ ಜೊತೆಗೆ, ಎನ್‌ಎಫ್‌ಸಿ ಮತ್ತು ಕ್ಯೂಆರ್ ಕೋಡ್ ಆಧಾರಿತ ಆಂಡ್ರಾಯ್ಡ್ ಪಾವತಿ ತಂತ್ರಜ್ಞಾನಗಳಲ್ಲಿ ತೊಡಗಿಸಿಕೊಂಡಿದ್ದೇನೆ.",
    },
    {
      id: "projects",
      title: "ಯೋಜನೆಗಳು",
      targetElementId: "projects",
      text: "ಟಾಕಿಂಗ್ ಯೂಟ್ಯೂಬ್ ಮತ್ತು ಕುಬರ್ನೆಟಿಸ್ ಆಧಾರಿತ ಕ್ಯೂಬ್-ಟ್ರಾನ್ಸಿಟ್ ಮುಂತಾದ ನವೀನ ಯೋಜನೆಗಳನ್ನು ಉತ್ಸಾಹದಿಂದ ನಿರ್ಮಿಸಿದ್ದೇನೆ.",
    },
    {
      id: "connect",
      title: "ಸಂಪರ್ಕಿಸಿ",
      targetElementId: "contact",
      text: "ನನ್ನ ಕೆಲಸವನ್ನು ವೀಕ್ಷಿಸಿದ್ದಕ್ಕಾಗಿ ತುಂಬು ಹೃದಯದ ಧನ್ಯವಾದಗಳು! ಸಹಯೋಗಕ್ಕಾಗಿ ಇಮೇಲ್ ಅಥವಾ ಲಿಂಕ್ಡ್‌ಇನ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ.",
    },
  ],
  ta: [
    {
      id: "intro",
      title: "அறிமுகம்",
      targetElementId: "hero",
      text: "வணக்கம்! நான் ஆதர்ஷ் பாண்டே. பெங்களூரைச் சேர்ந்த மென்பொருள் பொறியாளர். அளவிடக்கூடிய பின்தள அமைப்புகள், விநியோகிக்கப்பட்ட கட்டமைப்பு மற்றும் ஜெனரேட்டிவ் ஏஐ தொழில்நுட்பங்களில் தீவிர அனுபவம் கொண்டவன்.",
    },
    {
      id: "footprint",
      title: "பணி அனுபவம்",
      targetElementId: "telemetry",
      text: "அக்சென்ச்சரில், தினசரி பத்து லட்சத்திற்கும் அதிகமான பயணச் சீட்டு பரிவர்த்தனைகளைக் கையாளும் ஜாவா ஸ்பிரிங் பூட் மைக்ரோசர்வீஸ்கள் மற்றும் ஏடபிள்யூஎஸ் ஐஓடி வாகன அமைப்புகளை உருவாக்குகிறேன்.",
    },
    {
      id: "mindset",
      title: "பொறியியல் அணுகுமுறை",
      targetElementId: "doctrine",
      text: "அதிக சுமையிலும் நிலைத்து நிற்கும் உறுதியான கட்டமைப்பு, தெளிவான வடிவமைப்பு மற்றும் துல்லியமான கணினி கண்காணிப்பே எனது பொறியியல் அணுகுமுறை.",
    },
    {
      id: "experience",
      title: "அனுபவம் மற்றும் தாக்கம்",
      targetElementId: "experience",
      text: "பின்தள அமைப்புகளுடன், ஆண்ட்ராய்டு ஆப் வடிவமைப்பு மற்றும் என்எஃப்சி காண்டாக்ட்லெஸ் கட்டண முறைகளிலும் சிறப்பாகப் பணியாற்றியுள்ளேன்.",
    },
    {
      id: "projects",
      title: "திட்டங்கள்",
      targetElementId: "projects",
      text: "டாக்கிங் யூடியூப் போன்ற ஏஐ திட்டங்களையும், குபர்நெட்டீஸ் அடிப்படையிலான மைக்ரோசர்வீஸ்களையும் ஆர்வத்துடன் உருவாக்குகிறேன்.",
    },
    {
      id: "connect",
      title: "தொடர்பு கொள்ள",
      targetElementId: "contact",
      text: "எனது பக்கத்தைப் பார்வையிட்டதற்கு மிக்க நன்றி! இணைந்து பணியாற்ற கீழே உள்ள மின்னஞ்சல் மூலம் தொடர்பு கொள்ளலாம்.",
    },
  ],
  te: [
    {
      id: "intro",
      title: "పరిచయం",
      targetElementId: "hero",
      text: "నమస్తే! నేను ఆదర్శ్ పాండే. బెంగళూరులో పనిచేస్తున్న సాఫ్ట్‌వేర్ ఇంజనీర్‌ను. స్కేలబుల్ బ్యాకెండ్ మైక్రోసర్వీసెస్, డిస్ట్రిబ్యూటెడ్ సిస్టమ్స్ మరియు జెనరేటివ్ ఏఐలలో నాకు విశేష అనుభవం ఉంది.",
    },
    {
      id: "footprint",
      title: "కార్యక్షేత్రం",
      targetElementId: "telemetry",
      text: "యాక్సెంట్చర్‌లో, ప్రతిరోజూ పది లక్షలకు పైగా ట్రాన్సిట్ లావాదేవీలను నిర్వహించే స్ప్రింగ్ బూట్ సర్వీసెస్ మరియు ఏడబ్ల్యూఎస్ ఐఓటీ ఫ్లీట్ టెలిమెట్రీని అభివృద్ధి చేస్తున్నాను.",
    },
    {
      id: "mindset",
      title: "ఇంజనీరింగ్ విధానం",
      targetElementId: "doctrine",
      text: "నా ఇంజనీరింగ్ విధానం ఎల్లప్పుడూ సిస్టమ్ విశ్వసనీయత, హార్డ్‌వేర్ సామర్థ్యం మరియు స్థిరమైన కోడింగ్ స్పష్టతపై ఆధారపడి ఉంటుంది.",
    },
    {
      id: "experience",
      title: "అనుభవం మరియు ప్రభావం",
      targetElementId: "experience",
      text: "యాక్సెంట్చర్‌లో బ్యాకెండ్‌తో పాటు, ఆండ్రాయిడ్ ఎంవీవీఎం ఆర్కిటెక్చర్ మరియు ఎన్‌ఎఫ్‌సీ కాంటాక్ట్‌లెస్ పేమెంట్లలో ఉత్తమ ఫలితాలు సాధించాను.",
    },
    {
      id: "projects",
      title: "ప్రాజెక్టులు",
      targetElementId: "projects",
      text: "టాకింగ్ యూట్యూబ్ మరియు కుబెర్‌నెటీస్ ఆధారిత క్యూబ్-ట్రాన్సిట్ వంటి ఆధునిక ఓపెన్-సోర్స్ ప్రాజెక్ట్‌లను రూపొందించాను.",
    },
    {
      id: "connect",
      title: "సంప్రదించండి",
      targetElementId: "contact",
      text: "నా పోర్ట్‌ఫోలియోను సందర్శించినందుకు ధన్యవాదాలు! నాతో కలిసి పనిచేయడానికి ఈమెయిల్ లేదా లింక్డ్‌ఇన్ ద్వారా సంప్రదించండి.",
    },
  ],
  ml: [
    {
      id: "intro",
      title: "ആമുഖം",
      targetElementId: "hero",
      text: "നമസ്കാരം! ഞാൻ ആദർശ് പാണ്ഡെ. ബാംഗ്ലൂരിൽ പ്രവർത്തിക്കുന്ന സോഫ്റ്റ്‌വെയർ എൻജിനീയറാണ്. സ്കേലബിൾ ബാക്കെൻഡ് സിസ്റ്റങ്ങളിലും ജനറേറ്റീവ് എഐ സാങ്കേതികവിദ്യയിലും എനിക്ക് മികച്ച അനുഭവപരിചയമുണ്ട്.",
    },
    {
      id: "footprint",
      title: "ഔദ്യോഗിക മേഖല",
      targetElementId: "telemetry",
      text: "ആക്സെഞ്ചറിൽ, പ്രതിദിനം പത്ത് ലക്ഷത്തിലധികം ഇടപാടുകൾ കൈകാര്യം ചെയ്യുന്ന ട്രാൻസിറ്റ് മൈക്രോസർവീസുകളും എഡബ്ല്യുഎസ് ഐഒടി ഫ്ലീറ്റ് ടെലിമെട്രി സംവിധാനങ്ങളും ഞാൻ വികസിപ്പിച്ചു.",
    },
    {
      id: "mindset",
      title: "എൻജിനീയറിങ് കാഴ്ചപ്പാട്",
      targetElementId: "doctrine",
      text: "ഉയർന്ന വിശ്വാസ്യത, സിസ്റ്റം വ്യക്തത, ഹാർഡ്‌വെയർ പരിഗണന എന്നിവയാണ് എന്റെ പ്രധാന എൻജിനീയറിങ് തത്വങ്ങൾ.",
    },
    {
      id: "experience",
      title: "പരിചയവും സ്വാധീനവും",
      targetElementId: "experience",
      text: "ബാക്കെൻഡ് വികസനത്തോടൊപ്പം, ആൻഡ്രോയിഡ് എൻഎഫ്സി പേയ്‌മെന്റ് സാങ്കേതികവിദ്യകളിലും കാര്യക്ഷമമായി പ്രവർത്തിച്ചു.",
    },
    {
      id: "projects",
      title: "പ്രോജക്ടുകൾ",
      targetElementId: "projects",
      text: "ടോക്കിങ് യൂട്യൂബ്, കുബർനെറ്റിസ് അധിഷ്ഠിത മൈക്രോസർവീസുകൾ എന്നിവ ഞാൻ അഭിമാനത്തോടെ നിർമ്മിച്ച ചില പ്രോജക്ടുകളാണ്.",
    },
    {
      id: "connect",
      title: "ബന്ധപ്പെടുക",
      targetElementId: "contact",
      text: "എന്റെ പോർട്ട്‌ഫോളിയോ കണ്ടതിന് നന്ദി! സഹകരണത്തിനായി ഇമെയിൽ വഴി ബന്ധപ്പെടാവുന്നതാണ്.",
    },
  ],
  mr: [
    {
      id: "intro",
      title: "परिचय",
      targetElementId: "hero",
      text: "नमस्कार! मी आदर्श पाण्डेय. बंगळुरू येथे कार्यरत सॉफ्टवेअर अभियंता. स्केलेबल बॅकएंड मायक्रोसर्व्हिसेस, डिस्ट्रिब्युटेड सिस्टीम्स आणि जनरेटिव्ह एआय यामध्ये माझा विशेष अनुभव आहे.",
    },
    {
      id: "footprint",
      title: "कार्यक्षेत्र",
      targetElementId: "telemetry",
      text: "अ‍ॅक्सेंचरमध्ये, मी दररोज दहा लाखांहून अधिक व्यवहार हाताळणाऱ्या ट्रान्झिट मायक्रोसर्व्हिसेस आणि एडब्ल्यूएस आयओटी फ्लीट टेलिमेट्री प्रणालीवर काम करतो.",
    },
    {
      id: "mindset",
      title: "अभियांत्रिकी दृष्टिकोन",
      targetElementId: "doctrine",
      text: "सिस्टीमची स्थिरता, हार्डवेअरची जाण आणि स्पष्ट कोड यावर माझा ठाम विश्वास आहे.",
    },
    {
      id: "experience",
      title: "अनुभव आणि प्रभाव",
      targetElementId: "experience",
      text: "अ‍ॅक्सेंचरमध्ये बॅकएंडसह अँड्रॉइड एमव्हीव्हीएम आणि एनएफसी पेमेंट्सवर यशस्वीपणे काम केले आहे.",
    },
    {
      id: "projects",
      title: "प्रकल्प",
      targetElementId: "projects",
      text: "टॉकिंग यूट्यूब आणि कुबरनेट्सवरील क्युब-ट्रान्झिट हे माझे काही उल्लेखनीय ओपन-सोर्स प्रकल्प आहेत.",
    },
    {
      id: "connect",
      title: "संपर्क",
      targetElementId: "contact",
      text: "माझ्या पोर्टफोलिओला भेट दिल्याबद्दल धन्यवाद! एकत्रित काम करण्यासाठी ईमेलद्वारे संपर्क साधा.",
    },
  ],
  bn: [
    {
      id: "intro",
      title: "পরিচিতি",
      targetElementId: "hero",
      text: "নমস্কার! আমি আদর্শ পান্ডে। বেঙ্গালুরুতে কর্মরত একজন সফটওয়্যার ইঞ্জিনিয়ার। স্কেলেবল ব্যাকএন্ড মাইক্রোসার্ভিসেস, ডিস্ট্রিবিউটেড সিস্টেমস এবং জেনারেটিভ এআই-তে আমার বিশেষ দক্ষতা রয়েছে।",
    },
    {
      id: "footprint",
      title: "কর্মক্ষেত্র",
      targetElementId: "telemetry",
      text: "অ্যাকসেন্টারে, আমি প্রতিদিন দশ লক্ষাধিক ট্রানজিট লেনদেন পরিচালনাকারী জাভা স্প্রিং বুট সার্ভিসেস এবং এডব্লিউএস আইওটি টেলিমেট্রি সিস্টেম নিয়ে কাজ করি।",
    },
    {
      id: "mindset",
      title: "প্রকৌশল দর্শন",
      targetElementId: "doctrine",
      text: "উচ্চ নির্ভরযোগ্যতা, হার্ডওয়্যার সচেতনতা এবং পরিষ্কার কোডই আমার ইঞ্জিনিয়ারিংয়ের মূল ভিত্তি।",
    },
    {
      id: "experience",
      title: "অভিজ্ঞতা ও প্রভাব",
      targetElementId: "experience",
      text: "ব্যাকএন্ডের পাশাপাশি, অ্যান্ড্রয়েড প্ল্যাটফর্মে এনএফসি এবং কিউআর পেমেন্ট সিস্টেমের সফল বাস্তবায়ন করেছি।",
    },
    {
      id: "projects",
      title: "প্রকল্পসমূহ",
      targetElementId: "projects",
      text: "টকিং ইউটিউব এবং কুবারনেটিস-ভিত্তিক কিউবট্রানজিট-এর মতো আধুনিক ওপেন-সোর্স প্রজেক্ট তৈরি করেছি।",
    },
    {
      id: "connect",
      title: "যোগাযোগ",
      targetElementId: "contact",
      text: "আমার পোর্টফোলিও দেখার জন্য ধন্যবাদ! একসাথে কাজ করার জন্য নিচে ইমেইলে যোগাযোগ করতে পারেন।",
    },
  ],
  gu: [
    {
      id: "intro",
      title: "પરિચય",
      targetElementId: "hero",
      text: "નમસ્તે! હું આદર્શ પાંડે. બેંગલુરુમાં કાર્યરત સોફ્ટવેર એન્જિનિયર છું. સ્કેલેબલ બેકએન્ડ માઇક્રોસર્વિસિસ, ડિસ્ટ્રિબ્યુટેડ સિસ્ટમ્સ અને જનરેટિવ એઆઈમાં મારો વિશેષ રસ અને અનુભવ છે.",
    },
    {
      id: "footprint",
      title: "કાર્યક્ષેત્ર",
      targetElementId: "telemetry",
      text: "એક્સેન્ચરમાં, હું દરરોજ દસ લાખથી વધુ ટ્રાન્ઝિટ વ્યવહારો સંભાળતી સ્પ્રિંગ બૂટ સર્વિસિસ અને એડબ્લ્યુએસ આઈઓટી ફ્લીટ ટેલિમેટ્રી પર કામ કરું છું.",
    },
    {
      id: "mindset",
      title: "એન્જિનિયરિંગ વિચાર",
      targetElementId: "doctrine",
      text: "સિસ્ટમ વિશ્વસનીયતા, હાર્ડવેરની સમજ અને સ્વચ્છ કોડિંગ મારા મુખ્ય સિદ્ધાંતો છે.",
    },
    {
      id: "experience",
      title: "અનુભવ અને પ્રભાવ",
      targetElementId: "experience",
      text: "બેકએન્ડ સાથે એન્ડ્રોઇડ એમવીવીએમ આર્કિટેક્ચર અને એનએફસી કોન્ટેક્ટલેસ પેમેન્ટ્સ પર સફળતાપૂર્વક કામ કર્યું છે.",
    },
    {
      id: "projects",
      title: "પ્રોજેક્ટ્સ",
      targetElementId: "projects",
      text: "ટોકિંગ યુટ્યુબ અને કુબરનેટ્સ આધારિત ક્યુબટ્રાન્ઝિટ જેવા અદ્યતન પ્રોજેક્ટ્સ તૈયાર કર્યા છે.",
    },
    {
      id: "connect",
      title: "સંપર્ક કરો",
      targetElementId: "contact",
      text: "મારો પોર્ટફોલિયો જોવા બદલ ખૂબ આભાર! સાથે કામ કરવા માટે ઈમેઇલ દ્વારા મારો સંપર્ક કરી શકો છો.",
    },
  ],
  pa: [
    {
      id: "intro",
      title: "ਜਾਣ-ਪਛਾਣ",
      targetElementId: "hero",
      text: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ! ਮੈਂ ਆਦਰਸ਼ ਪਾਂਡੇ। ਬੈਂਗਲੁਰੂ ਵਿੱਚ ਕੰਮ ਕਰ ਰਿਹਾ ਇੱਕ ਸਾਫਟਵੇਅਰ ਇੰਜੀਨੀਅਰ ਹਾਂ। ਸਕੇਲੇਬਲ ਬੈਕਐਂਡ ਮਾਈਕ੍ਰੋਸਰਵਿਸਿਜ਼, ਡਿਸਟ੍ਰੀਬਿਊਟਿਡ ਸਿਸਟਮਾਂ ਅਤੇ ਜੈਨਰੇਟਿਵ ਏਆਈ ਵਿੱਚ ਮੇਰਾ ਠੋਸ ਤਜਰਬਾ ਹੈ।",
    },
    {
      id: "footprint",
      title: "ਕਾਰਜ ਖੇਤਰ",
      targetElementId: "telemetry",
      text: "ਐਕਸੈਂਚਰ ਵਿੱਚ, ਮੈਂ ਰੋਜ਼ਾਨਾ ਦਸ ਲੱਖ ਤੋਂ ਵੱਧ ਟ੍ਰਾਂਜਿਟ ਲੈਣ-ਦੇਣ ਸੰਭਾਲਣ ਵਾਲੀਆਂ ਸਿਸਟਮਾਂ ਅਤੇ ਏਡਬਲਯੂਐਸ ਆਈਓਟੀ ਫਲੀਟ ਟੈਲੀਮੈਟਰੀ 'ਤੇ ਕੰਮ ਕਰਦਾ ਹਾਂ।",
    },
    {
      id: "mindset",
      title: "ਇੰਜੀਨੀਅਰਿੰਗ ਸੋਚ",
      targetElementId: "doctrine",
      text: "ਸਿਸਟਮ ਭਰੋਸੇਯੋਗਤਾ, ਹਾਰਡਵੇਅਰ ਸਮਝ ਅਤੇ ਸਾਫ਼ ਕੋਡ ਮੇਰੇ ਇੰਜੀਨੀਅਰਿੰਗ ਦੇ ਮੁੱਖ ਥੰਮ੍ਹ ਹਨ।",
    },
    {
      id: "experience",
      title: "ਤਜਰਬਾ ਅਤੇ ਪ੍ਰਭਾਵ",
      targetElementId: "experience",
      text: "ਬੈਕਐਂਡ ਦੇ ਨਾਲ-ਨਾਲ, ਮੈਂ ਐਂਡਰਾਇਡ ਐਮਵੀਵੀਐਮ ਅਤੇ ਐਨਐਫਸੀ ਭੁਗਤਾਨ ਪ੍ਰਣਾਲੀਆਂ 'ਤੇ ਸਫਲਤਾਪੂਰਵਕ ਕੰਮ ਕੀਤਾ ਹੈ।",
    },
    {
      id: "projects",
      title: "ਪ੍ਰੋਜੈਕਟ",
      targetElementId: "projects",
      text: "ਟਾਕਿੰਗ ਯੂਟਿਊਬ ਅਤੇ ਕੁਬਰਨੇਟਿਸ ਅਧਾਰਿਤ ਕਯੂਬ-ਟ੍ਰਾਂਜਿਟ ਵਰਗੇ ਆਧੁਨਿਕ ਪ੍ਰੋਜੈਕਟ ਤਿਆਰ ਕੀਤੇ ਹਨ।",
    },
    {
      id: "connect",
      title: "ਸੰਪਰਕ ਕਰੋ",
      targetElementId: "contact",
      text: "ਮੇਰਾ ਪੋਰਟਫੋਲੀਓ ਦੇਖਣ ਲਈ ਧੰਨਵਾਦ! ਮਿਲ ਕੇ ਕੰਮ ਕਰਨ ਲਈ ਈਮੇਲ ਰਾਹੀਂ ਸੰਪਰਕ ਕਰੋ ਜੀ।",
    },
  ],
  or: [
    {
      id: "intro",
      title: "ପରିଚୟ",
      targetElementId: "hero",
      text: "ନମସ୍କାର! ମୁଁ ଆଦର୍ଶ ପାଣ୍ଡେ। ବାଙ୍ଗାଲୋରରେ କାର୍ଯ୍ୟରତ ଜଣେ ସଫ୍ଟୱେର୍ ଇଞ୍ଜିନିୟର୍। ସ୍କେଲେବଲ୍ ବ୍ୟାକ୍ଏଣ୍ଡ୍ ମାଇକ୍ରୋସର୍ଭିସ୍, ଡିଷ୍ଟ୍ରିବ୍ୟୁଟେଡ୍ ସିଷ୍ଟମ୍ ଏବଂ ଜେନେରେଟିଭ୍ ଏଆଇ କ୍ଷେତ୍ରରେ ମୋର ଗଭୀର ଅନୁଭୂତି ରହିଛି।",
    },
    {
      id: "footprint",
      title: "କାର୍ଯ୍ୟକ୍ଷେତ୍ର",
      targetElementId: "telemetry",
      text: "ଆକ୍ସେଞ୍ଚର୍ରେ, ମୁଁ ପ୍ରତିଦିନ ଦଶ ଲକ୍ଷରୁ ଅଧିକ ପରିବହନ କାରବାର ପରିଚାଳନା କରୁଥିବା ସ୍ପ୍ରିଙ୍ଗ୍ ବୁଟ୍ ସର୍ଭିସ୍ ଏବଂ ଏଡବ୍ଲୁଏସ୍ ଆଇଓଟି ସିଷ୍ଟମ୍ରେ କାର୍ଯ୍ୟ କରୁଛି।",
    },
    {
      id: "mindset",
      title: "ଇଞ୍ଜିନିୟରିଂ ଚିନ୍ତାଧାରା",
      targetElementId: "doctrine",
      text: "ସିଷ୍ଟମ୍ର ସ୍ଥାୟୀତ୍ୱ, ହାର୍ଡୱେର୍ ସଚେତନତା ଏବଂ ସ୍ପଷ୍ଟ କୋଡିଂ ମୋର ପ୍ରମୁଖ ଲକ୍ଷ୍ୟ।",
    },
    {
      id: "experience",
      title: "ଅନୁଭବ ଓ ପ୍ରଭାବ",
      targetElementId: "experience",
      text: "ବ୍ୟାକ୍ଏଣ୍ଡ୍ ସହିତ, ଆଣ୍ଡ୍ରଏଡ୍ ଏନଏଫସି ପେମେଣ୍ଟ ଟେକ୍ନୋଲୋଜିରେ ମୁଁ ଦକ୍ଷତାର ସହ କାର୍ଯ୍ୟ କରିଛି।",
    },
    {
      id: "projects",
      title: "ପ୍ରକଳ୍ପ ସମୂହ",
      targetElementId: "projects",
      text: "ଟକିଂ ୟୁଟ୍ୟୁବ୍ ଏବଂ କୁବର୍ଣ୍ଣେଟିସ୍ ଆଧାରିତ କ୍ୟୁବ୍-ଟ୍ରାଞ୍ଜିଟ୍ ଭଳି ଆଧୁନିକ ପ୍ରୋଜେକ୍ଟ ନିର୍ମାଣ କରିଛି।",
    },
    {
      id: "connect",
      title: "ଯୋଗାଯୋଗ",
      targetElementId: "contact",
      text: "ମୋର ପୋର୍ଟଫୋଲିଓ ଦେଖିଥିବାରୁ ଧନ୍ୟବାଦ! ଏକାଠି କାମ କରିବା ପାଇଁ ଇମେଲ୍ ମାଧ୍ୟମରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    },
  ],
};
