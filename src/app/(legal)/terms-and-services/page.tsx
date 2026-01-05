export default function TermsAndServicesPage() {
  return (
    <div
      className="container mx-auto px-4 py-8 max-w-4xl bg-background"
      dir="rtl"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">الشروط والأحكام</h1>

      <div className="space-y-6 text-right">
        <section>
          <p className="mb-6">
            آخر تحديث: {new Date().toLocaleDateString("ar-EG")}
          </p>
          <p className="text-lg leading-relaxed">
            مرحباً بك في منصتنا. باستخدامك لهذه المنصة، فإنك توافق على الالتزام
            بالشروط والأحكام التالية. يرجى قراءتها بعناية.
          </p>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">قبول الشروط</h2>
          <p className="leading-relaxed">
            باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا
            كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام المنصة.
          </p>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">استخدام الخدمة</h2>
          <p className="leading-relaxed mb-3">
            عند استخدام منصتنا، فإنك توافق على:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-6">
            <li>استخدام الخدمة للأغراض التعليمية المشروعة فقط</li>
            <li>عدم انتهاك حقوق الملكية الفكرية لأي طرف</li>
            <li>عدم مشاركة معلومات حسابك مع الآخرين</li>
            <li>الحفاظ على سرية بيانات الدخول الخاصة بك</li>
          </ul>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">الحسابات والتسجيل</h2>
          <p className="leading-relaxed mb-3">
            لاستخدام بعض ميزات المنصة، يجب عليك إنشاء حساب. أنت مسؤول عن:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-6">
            <li>الحفاظ على دقة معلومات حسابك</li>
            <li>أمان كلمة المرور الخاصة بك</li>
            <li>جميع الأنشطة التي تتم من خلال حسابك</li>
            <li>إخطارنا فوراً بأي استخدام غير مصرح به</li>
          </ul>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">المحتوى التعليمي</h2>
          <p className="leading-relaxed">
            جميع المواد التعليمية والمحتوى المتاح على المنصة محمي بحقوق الملكية
            الفكرية. يُسمح لك باستخدام المحتوى لأغراضك التعليمية الشخصية فقط.
            يُحظر نسخ أو توزيع أو بيع المحتوى دون إذن صريح.
          </p>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">السلوك المحظور</h2>
          <p className="leading-relaxed mb-3">
            يُحظر عليك القيام بأي من الأنشطة التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-6">
            <li>نشر محتوى مسيء أو غير لائق</li>
            <li>محاولة اختراق أو تعطيل المنصة</li>
            <li>استخدام المنصة لأغراض تجارية غير مصرح بها</li>
            <li>انتحال شخصية الآخرين</li>
            <li>جمع معلومات المستخدمين الآخرين</li>
          </ul>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">الرسوم والاشتراكات</h2>
          <p className="leading-relaxed">
            قد تتطلب بعض خدماتنا دفع رسوم اشتراك. جميع الرسوم نهائية وغير قابلة
            للاسترداد إلا في الحالات التي ينص عليها القانون. نحتفظ بالحق في
            تغيير أسعار الاشتراك مع إشعار مسبق.
          </p>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">إنهاء الخدمة</h2>
          <p className="leading-relaxed">
            نحتفظ بالحق في تعليق أو إنهاء حسابك في أي وقت إذا انتهكت هذه الشروط.
            يمكنك أيضاً إلغاء حسابك في أي وقت من خلال إعدادات الحساب.
          </p>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">إخلاء المسؤولية</h2>
          <p className="leading-relaxed">
            نقدم المنصة "كما هي" دون أي ضمانات. لا نضمن أن الخدمة ستكون خالية من
            الأخطاء أو متاحة دون انقطاع. لن نكون مسؤولين عن أي أضرار مباشرة أو
            غير مباشرة تنتج عن استخدامك للمنصة.
          </p>
        </section>

        <section className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold mb-4">التعديلات على الشروط</h2>
          <p className="leading-relaxed">
            قد نقوم بتحديث هذه الشروط والأحكام من وقت لآخر. سيتم إعلامك بأي
            تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على المنصة. استمرارك
            في استخدام الخدمة بعد التعديلات يعني قبولك للشروط الجديدة.
          </p>
        </section>

        <section className="border-t border-border pt-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">تواصل معنا</h2>
          <p className="leading-relaxed">
            إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا عبر
            البريد الإلكتروني.
          </p>
        </section>
      </div>
    </div>
  );
}
