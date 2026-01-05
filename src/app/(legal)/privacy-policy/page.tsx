export default function PrivacyPolicyPage() {
  return (
    <div
      className="container mx-auto px-4 py-8 max-w-4xl bg-background "
      dir="rtl"
    >
      <h1 className="text-4xl font-bold mb-8 text-center ">سياسة الخصوصية</h1>

      <div className="space-y-6 text-right">
        <section>
          <p className=" mb-6">
            آخر تحديث: {new Date().toLocaleDateString("ar-EG")}
          </p>
          <p className="text-lg leading-relaxed">
            نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية
            هذه كيفية جمع واستخدام وحماية معلوماتك.
          </p>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4 ">
            المعلومات التي نجمعها
          </h2>
          <p className="leading-relaxed mb-3 ">
            نقوم بجمع المعلومات التالية عند استخدامك لخدماتنا:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-6 ">
            <li>المعلومات الشخصية (الاسم، البريد الإلكتروني)</li>
            <li>بيانات الاستخدام والتفاعل مع المنصة</li>
            <li>المعلومات التقنية (عنوان IP، نوع المتصفح)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            كيفية استخدام المعلومات
          </h2>
          <p className="leading-relaxed mb-3">
            نستخدم المعلومات المجمعة للأغراض التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-6">
            <li>تقديم وتحسين خدماتنا</li>
            <li>التواصل معك بخصوص حسابك</li>
            <li>تخصيص تجربة التعلم الخاصة بك</li>
            <li>حماية أمان المنصة</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">حماية البيانات</h2>
          <p className="leading-relaxed">
            نتخذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير
            المصرح به أو التغيير أو الإفصاح أو الإتلاف. نستخدم تقنيات التشفير
            والبروتوكولات الآمنة لحماية بياناتك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">مشاركة المعلومات</h2>
          <p className="leading-relaxed">
            لا نقوم بمشاركة معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات
            التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-6 mt-3">
            <li>بموافقتك الصريحة</li>
            <li>للامتثال للمتطلبات القانونية</li>
            <li>لحماية حقوقنا وممتلكاتنا</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">حقوقك</h2>
          <p className="leading-relaxed mb-3">لديك الحق في:</p>
          <ul className="list-disc list-inside space-y-2 mr-6">
            <li>الوصول إلى بياناتك الشخصية</li>
            <li>تصحيح البيانات غير الدقيقة</li>
            <li>طلب حذف بياناتك</li>
            <li>الاعتراض على معالجة بياناتك</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            ملفات تعريف الارتباط (Cookies)
          </h2>
          <p className="leading-relaxed">
            نستخدم ملفات تعريف الارتباط لتحسين تجربتك على منصتنا. يمكنك التحكم
            في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">التحديثات</h2>
          <p className="leading-relaxed">
            قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي
            تغييرات جوهرية عبر البريد الإلكتروني أو من خلال إشعار على منصتنا.
          </p>
        </section>

        <section className="border-t pt-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">تواصل معنا</h2>
          <p className="leading-relaxed">
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر
            البريد الإلكتروني.
          </p>
        </section>
      </div>
    </div>
  );
}
