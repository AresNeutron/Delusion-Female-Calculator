import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Info() {
  return (
    <div className="mb-12">
      <h2 className="text-center text-3xl font-extrabold text-white">
        <FontAwesomeIcon icon={faCalculator} className="mr-2" />
        Female Delusion Calculator
      </h2>
      <div className="p-10">
        <p className="mt-2 m-auto text-center text-xl text-blue-200">
          Use this simple form to input your materialistic preferences for the
          ideal man, including age range, height, race, and expected salary. The
          app will analyze your criteria and calculate the percentage of men in
          the USA who match your description, giving you a fun insight into your
          chances of finding "the one".
        </p>
        <p className="mt-2 m-auto text-center text-xl text-blue-200">
          Of course, the more expectations you have, the lower the result will
          be 🤣🤣🤣.
        </p>
        <p className="mt-2 m-auto text-center text-xl text-blue-200">
          The app will show your rate of delusion😔 based on this .
        </p>
      </div>
      <p className="mt-2 m-auto text-center text-sm mb-8 text-blue-200">
        ** Please note this is not true at all due to lack of enough data
      </p>
    </div>
  );
}

export default Info;
