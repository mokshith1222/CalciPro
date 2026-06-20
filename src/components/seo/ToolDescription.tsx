import React from 'react';

interface ToolDescriptionProps {
  title: string;
  description: string;
}

export function ToolDescription({ title, description }: ToolDescriptionProps) {
  const shortTitle = title.split('–')[0].trim();

  return (
    <div className="mt-16 prose prose-invert max-w-none">
      <div className="bg-muted/20 border rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-black mb-4">About {shortTitle}</h3>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {description} This free online utility is designed to help you quickly and accurately perform calculations without needing complex spreadsheets or manual formulas. Whether you're a professional, student, or just someone looking to make informed decisions, the {shortTitle} provides instant results with privacy in mind.
        </p>
        
        <h3 className="text-xl font-bold mb-3 mt-8">How to use this tool</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Input your values:</strong> Start by entering the required parameters into the input fields or using the sliders provided above.</li>
          <li><strong>Review the results:</strong> As you adjust the inputs, the calculator instantly processes the data and updates the results in real-time.</li>
          <li><strong>Analyze the breakdown:</strong> For advanced tools, interactive charts and step-by-step breakdowns will appear, helping you visualize the outcome.</li>
          <li><strong>Save your history:</strong> Click the calculate or save button to store your calculation history locally on your device for future reference.</li>
        </ul>

        <h3 className="text-xl font-bold mb-3 mt-8">Why use our {shortTitle}?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Manual calculations can be prone to errors and time-consuming. Our {shortTitle} is built to ensure precision, speed, and reliability. It operates entirely within your browser, ensuring that your sensitive data remains private and is never sent to external servers. By using this tool, you can save valuable time and focus on what matters most—making the right decisions based on accurate data.
        </p>
      </div>
    </div>
  );
}
